import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authMiddleware, adminMiddleware } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const skill = await prisma.skill.findUnique({
      where: { id },
    });

    if (!skill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    return NextResponse.json(skill);
  } catch (error) {
    console.error("Error fetching skill:", error);
    return NextResponse.json(
      { error: "Failed to fetch skill" },
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
    const data = await request.json();

    const existingSkill = await prisma.skill.findUnique({
      where: { id },
    });

    if (!existingSkill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    if (
      typeof data.proficiency !== "undefined" &&
      (data.proficiency < 0 || data.proficiency > 100)
    ) {
      return NextResponse.json(
        { error: "Proficiency must be between 0 and 100" },
        { status: 400 }
      );
    }

    const updatedSkill = await prisma.skill.update({
      where: { id },
      data: {
        name: data.name,
        proficiency: data.proficiency,
      },
    });

    return NextResponse.json(updatedSkill);
  } catch (error) {
    console.error("Error updating skill:", error);
    return NextResponse.json(
      { error: "Failed to update skill" },
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
        icon: "asd",
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

    const existingSkill = await prisma.skill.findUnique({
      where: { id },
    });

    if (!existingSkill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    await prisma.skill.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Skill deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting skill:", error);
    return NextResponse.json(
      { error: "Failed to delete skill" },
      { status: 500 }
    );
  }
}
