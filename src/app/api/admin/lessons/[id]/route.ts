import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

async function verifyAdmin() {
  const session = await getSession();
  if (!session) return null;
  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { role: true },
  });
  if (!user || user.role !== "ADMIN") return null;
  return user;
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await verifyAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  const body = await req.json();
  const { title, video_url, cover_url, category, is_featured, hero_type } = body;

  if (hero_type === "LAUNCH" || hero_type === "FEATURED") {
    // Desmarcar outra aula que tenha esse tipo
    await prisma.lesson.updateMany({
      where: { hero_type, id: { not: id } },
      data: { hero_type: null },
    });
  }

  const lesson = await prisma.lesson.update({
    where: { id },
    data: {
      ...(title !== undefined && { title }),
      ...(video_url !== undefined && { video_url }),
      ...(cover_url !== undefined && { cover_url: cover_url || null }),
      ...(category !== undefined && { category: category || null }),
      ...(is_featured !== undefined && { is_featured }),
      ...(hero_type !== undefined && { hero_type }),
    },
  });

  return NextResponse.json(lesson);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await verifyAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  await prisma.lesson.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
