import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authMiddleware, adminMiddleware } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    // For admin section, check authentication
    const authResponse = await authMiddleware(request);
    if (authResponse.status !== 200) return authResponse;

    // Get all tags sorted alphabetically
    const tags = await prisma.tag.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(tags);
  } catch (error) {
    console.error("Error fetching tags:", error);
    return NextResponse.json(
      { error: "Failed to fetch tags" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication and admin status
    const authResponse = await authMiddleware(request);
    if (authResponse.status !== 200) return authResponse;

    const adminResponse = await adminMiddleware(request);
    if (adminResponse.status !== 200) return adminResponse;

    const body = await request.json();
    const { name } = body;

    if (!name || typeof name !== "string" || name.trim() === "") {
      return NextResponse.json(
        { error: "Tag name is required" },
        { status: 400 }
      );
    }

    // Check if tag already exists
    const existingTag = await prisma.tag.findUnique({
      where: { name: name.trim() },
    });

    if (existingTag) {
      return NextResponse.json(
        { error: "Tag already exists", tag: existingTag },
        { status: 409 }
      );
    }

    // Create new tag
    const tag = await prisma.tag.create({
      data: {
        name: name.trim(),
      },
    });

    return NextResponse.json(tag, { status: 201 });
  } catch (error) {
    console.error("Error creating tag:", error);
    return NextResponse.json(
      { error: "Failed to create tag" },
      { status: 500 }
    );
  }
}
