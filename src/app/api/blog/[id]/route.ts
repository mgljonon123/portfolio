import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authMiddleware, adminMiddleware } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "Invalid blog ID" }, { status: 400 });
    }

    const url = new URL(request.url);
    const isPublic = url.searchParams.get("public") === "true";

    if (!isPublic) {
      const authResponse = await authMiddleware(request);
      if (authResponse.status !== 200) return authResponse;

      const adminResponse = await adminMiddleware(request);
      if (adminResponse.status !== 200) return adminResponse;
    }

    const blogPost = await prisma.blog.findUnique({
      where: { id },
      include: {
        blogTags: { include: { tag: true } },
      },
    });

    if (!blogPost || (isPublic && !blogPost.published)) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    const formattedPost = {
      id: blogPost.id,
      title: blogPost.title,
      description: blogPost.description,
      imageBlog: blogPost.imageBlog,
      published: blogPost.published,
      createdAt: blogPost.createdAt,
      updatedAt: blogPost.updatedAt,
      tags: blogPost.blogTags.map((blogTag) => blogTag.tag),
    };

    return NextResponse.json(formattedPost);
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResponse = await authMiddleware(request);
    if (authResponse.status !== 200) return authResponse;

    const adminResponse = await adminMiddleware(request);
    if (adminResponse.status !== 200) return adminResponse;

    const { id } = params;
    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "Invalid blog ID" }, { status: 400 });
    }

    let data;
    try {
      data = await request.json();
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    const { title, description, imageBlog, published, tags } = data;
    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    const existingPost = await prisma.blog.findUnique({ where: { id } });
    if (!existingPost) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    await prisma.blog.update({
      where: { id },
      data: {
        title,
        description,
        imageBlog: imageBlog ?? existingPost.imageBlog,
        published: published ?? existingPost.published,
        updatedAt: new Date(),
      },
    });

    if (tags && Array.isArray(tags)) {
      try {
        await prisma.blogTag.deleteMany({ where: { blogId: id } });

        for (const tagName of tags) {
          if (typeof tagName !== "string" || !tagName.trim()) continue;

          const tag = await prisma.tag.upsert({
            where: { name: tagName.trim() },
            update: {},
            create: { name: tagName.trim() },
          });

          await prisma.blogTag.create({
            data: {
              blogId: id,
              tagId: tag.id,
            },
          });
        }
      } catch (err) {
        console.error("Error updating tags:", err);
      }
    }

    const blogWithTags = await prisma.blog.findUnique({
      where: { id },
      include: {
        blogTags: { include: { tag: true } },
      },
    });

    const formattedPost = {
      id: blogWithTags?.id,
      title: blogWithTags?.title,
      description: blogWithTags?.description,
      imageBlog: blogWithTags?.imageBlog,
      published: blogWithTags?.published,
      createdAt: blogWithTags?.createdAt,
      updatedAt: blogWithTags?.updatedAt,
      tags: blogWithTags?.blogTags.map((blogTag) => blogTag.tag) || [],
    };

    return NextResponse.json(formattedPost);
  } catch (error) {
    console.error("Error updating blog post:", error);
    return NextResponse.json(
      { error: "Failed to update blog post" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResponse = await authMiddleware(request);
    if (authResponse.status !== 200) return authResponse;

    const adminResponse = await adminMiddleware(request);
    if (adminResponse.status !== 200) return adminResponse;

    const { id } = params;
    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "Invalid blog ID" }, { status: 400 });
    }

    const existingPost = await prisma.blog.findUnique({ where: { id } });
    if (!existingPost) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    try {
      await prisma.blogTag.deleteMany({ where: { blogId: id } });
    } catch (err) {
      console.error("Error deleting blog tags:", err);
    }

    await prisma.blog.delete({ where: { id } });

    return NextResponse.json(
      { message: "Blog post deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json(
      { error: "Failed to delete blog post" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResponse = await authMiddleware(request);
    if (authResponse.status !== 200) return authResponse;

    const adminResponse = await adminMiddleware(request);
    if (adminResponse.status !== 200) return adminResponse;

    const { id } = params;
    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "Invalid blog ID" }, { status: 400 });
    }

    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    const existingPost = await prisma.blog.findUnique({ where: { id } });
    if (!existingPost) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    const { tags, ...blogUpdates } = body;

    await prisma.blog.update({
      where: { id },
      data: {
        ...blogUpdates,
        updatedAt: new Date(),
      },
    });

    if (tags && Array.isArray(tags)) {
      try {
        await prisma.blogTag.deleteMany({ where: { blogId: id } });

        for (const tagName of tags) {
          if (typeof tagName !== "string" || !tagName.trim()) continue;

          const tag = await prisma.tag.upsert({
            where: { name: tagName.trim() },
            update: {},
            create: { name: tagName.trim() },
          });

          await prisma.blogTag.create({
            data: {
              blogId: id,
              tagId: tag.id,
            },
          });
        }
      } catch (err) {
        console.error("Error updating tags:", err);
      }
    }

    const blogWithTags = await prisma.blog.findUnique({
      where: { id },
      include: {
        blogTags: { include: { tag: true } },
      },
    });

    const formattedPost = blogWithTags
      ? {
          id: blogWithTags.id,
          title: blogWithTags.title,
          description: blogWithTags.description,
          imageBlog: blogWithTags.imageBlog,
          published: blogWithTags.published,
          createdAt: blogWithTags.createdAt,
          updatedAt: blogWithTags.updatedAt,
          tags: blogWithTags.blogTags.map((blogTag) => blogTag.tag),
        }
      : null;

    return NextResponse.json(formattedPost);
  } catch (error) {
    console.error("Error updating blog post:", error);
    return NextResponse.json(
      { error: "Failed to update blog post" },
      { status: 500 }
    );
  }
}
