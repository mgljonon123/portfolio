import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authMiddleware, adminMiddleware } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    console.log("Received blog post submission");
    // Use more robust error handling when parsing JSON
    let body;
    try {
      body = await request.json();
      console.log("Blog data:", body);
    } catch (error) {
      console.error("Error parsing request JSON:", error);
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    const { title, description, imageBlog, published, tags } = body;

    // Validate required fields
    if (!title || !description) {
      console.log("Missing required fields");
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    // Check authentication and admin status
    const authResponse = await authMiddleware(request as NextRequest);
    if (authResponse.status !== 200) return authResponse;

    const adminResponse = await adminMiddleware(request as NextRequest);
    if (adminResponse.status !== 200) return adminResponse;

    // Save blog post to database with tags if provided
    console.log("Saving to database...");

    const blogPost = await prisma.blog.create({
      data: {
        title,
        description,
        imageBlog: imageBlog || null,
        published: published || false,
      },
    });

    // Handle tags if provided
    if (tags && Array.isArray(tags) && tags.length > 0) {
      // Process tags
      for (const tagName of tags) {
        if (typeof tagName !== "string" || !tagName.trim()) continue;

        try {
          // Find or create the tag
          const tag = await prisma.tag.upsert({
            where: { name: tagName.trim() },
            update: {},
            create: { name: tagName.trim() },
          });

          // Create the relationship
          await prisma.blogTag.create({
            data: {
              blogId: blogPost.id,
              tagId: tag.id,
            },
          });
        } catch (err) {
          console.error(`Error processing tag ${tagName}:`, err);
          // Continue with other tags even if one fails
        }
      }
    }

    // Fetch the complete blog post with tags
    const blogWithTags = await prisma.blog.findUnique({
      where: { id: blogPost.id },
      include: {
        blogTags: {
          include: {
            tag: true,
          },
        },
      },
    });

    // Transform data for response to avoid circular references
    const formattedBlog = {
      ...blogWithTags,
      tags: blogWithTags?.blogTags.map((blogTag) => blogTag.tag) || [],
      blogTags: undefined,
    };

    console.log("Saved blog post:", JSON.stringify(formattedBlog));

    return NextResponse.json(
      { message: "Blog post created successfully", blog: formattedBlog },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving blog post:", error);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log("Fetching blog posts");

    // For public access to published posts only, skip authentication
    const url = new URL(request.url);
    const isPublic = url.searchParams.get("public") === "true";

    if (!isPublic) {
      const authResponse = await authMiddleware(request);
      if (authResponse.status !== 200) return authResponse;

      const adminResponse = await adminMiddleware(request);
      if (adminResponse.status !== 200) return adminResponse;
    }

    // Query parameters
    const publishedOnly =
      isPublic || url.searchParams.get("published") === "true";

    const blogPosts = await prisma.blog.findMany({
      where: publishedOnly ? { published: true } : {},
      orderBy: { createdAt: "desc" },
      include: {
        blogTags: {
          include: {
            tag: true,
          },
        },
      },
    });

    // Transform the data to include tags in a cleaner format
    const formattedPosts = blogPosts.map((post) => ({
      id: post.id,
      title: post.title,
      description: post.description,
      imageBlog: post.imageBlog,
      published: post.published,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      tags: post.blogTags.map((blogTag) => blogTag.tag),
    }));

    console.log(`Found ${blogPosts.length} blog posts`);

    return NextResponse.json(formattedPosts);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}
