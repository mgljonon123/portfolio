import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authMiddleware, adminMiddleware } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const skills = await prisma.skill.findMany();
    return NextResponse.json(skills);
  } catch (error) {
    console.error("Error fetching skills:", error);
    return NextResponse.json(
      { error: "Failed to fetch skills" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authResponse = await authMiddleware(request);
    if (authResponse.status !== 200) return authResponse;

    const adminResponse = await adminMiddleware(request);
    if (adminResponse.status !== 200) return adminResponse;

    const data = await request.json();
    if (!data.name || typeof data.proficiency !== "number") {
      return NextResponse.json(
        {
          error:
            "Missing or invalid required fields (name and proficiency are required)",
        },
        { status: 400 }
      );
    }
    if (data.proficiency < 0 || data.proficiency > 100) {
      return NextResponse.json(
        { error: "Proficiency must be between 0 and 100" },
        { status: 400 }
      );
    }

    const skill = await prisma.skill.create({
      data: {
        name: data.name,
        proficiency: data.proficiency,
      },
    });

    return NextResponse.json(skill, { status: 201 });
  } catch (error) {
    console.error("Error creating skill:", error);
    return NextResponse.json(
      { error: "Failed to create skill" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const authResponse = await authMiddleware(request);
    if (authResponse.status !== 200) return authResponse;

    const adminResponse = await adminMiddleware(request);
    if (adminResponse.status !== 200) return adminResponse;

    const data = await request.json();
    if (!data.id || !data.name || typeof data.proficiency !== "number") {
      return NextResponse.json(
        {
          error:
            "Missing or invalid required fields (id, name, and proficiency are required)",
        },
        { status: 400 }
      );
    }
    if (data.proficiency < 0 || data.proficiency > 100) {
      return NextResponse.json(
        { error: "Proficiency must be between 0 and 100" },
        { status: 400 }
      );
    }

    const skill = await prisma.skill.update({
      where: { id: data.id },
      data: {
        name: data.name,
        proficiency: data.proficiency,
      },
    });

    return NextResponse.json(skill);
  } catch (error) {
    console.error("Error updating skill:", error);
    return NextResponse.json(
      { error: "Failed to update skill" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const authResponse = await authMiddleware(request);
    if (authResponse.status !== 200) return authResponse;

    const adminResponse = await adminMiddleware(request);
    if (adminResponse.status !== 200) return adminResponse;

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing skill ID" }, { status: 400 });
    }

    await prisma.skill.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Skill deleted" });
  } catch (error) {
    console.error("Error deleting skill:", error);
    return NextResponse.json(
      { error: "Failed to delete skill" },
      { status: 500 }
    );
  }
}
