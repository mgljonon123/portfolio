import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authMiddleware, adminMiddleware } from "@/lib/auth";

function getIdFromRequest(request: NextRequest): string | null {
  const urlParts = new URL(request.url).pathname.split("/");
  return urlParts[urlParts.length - 1] || null;
}

export async function GET(request: NextRequest) {
  try {
    const id = getIdFromRequest(request);
    if (!id) {
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
  } catch (err) {
    console.error("Error fetching blog post:", err);
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const id = getIdFromRequest(request);
    if (!id) {
      return NextResponse.json({ error: "Invalid blog ID" }, { status: 400 });
    }

    const authResponse = await authMiddleware(request);
    if (authResponse.status !== 200) return authResponse;

    const adminResponse = await adminMiddleware(request);
    if (adminResponse.status !== 200) return adminResponse;

    const data = await request.json();
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
  } catch (err) {
    console.error("Error updating blog post:", err);
    return NextResponse.json(
      { error: "Failed to update blog post" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = getIdFromRequest(request);
    if (!id) {
      return NextResponse.json({ error: "Invalid blog ID" }, { status: 400 });
    }

    const authResponse = await authMiddleware(request);
    if (authResponse.status !== 200) return authResponse;

    const adminResponse = await adminMiddleware(request);
    if (adminResponse.status !== 200) return adminResponse;

    const existingPost = await prisma.blog.findUnique({ where: { id } });
    if (!existingPost) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    await prisma.blogTag.deleteMany({ where: { blogId: id } });
    await prisma.blog.delete({ where: { id } });

    return NextResponse.json(
      { message: "Blog post deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error deleting blog post:", err);
    return NextResponse.json(
      { error: "Failed to delete blog post" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const id = getIdFromRequest(request);
    if (!id) {
      return NextResponse.json({ error: "Invalid blog ID" }, { status: 400 });
    }

    const authResponse = await authMiddleware(request);
    if (authResponse.status !== 200) return authResponse;

    const adminResponse = await adminMiddleware(request);
    if (adminResponse.status !== 200) return adminResponse;

    const body = await request.json();
    const { tags, ...blogUpdates } = body;

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
        ...blogUpdates,
        updatedAt: new Date(),
      },
    });

    if (tags && Array.isArray(tags)) {
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
  } catch (err) {
    console.error("Error updating blog post:", err);
    return NextResponse.json(
      { error: "Failed to update blog post" },
      { status: 500 }
    );
  }
}
