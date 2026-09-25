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

export async function GET() {
  const admin = await verifyAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const lessons = await prisma.lesson.findMany({
    orderBy: { created_at: "desc" },
  });

  return NextResponse.json(lessons);
}

export async function POST(req: NextRequest) {
  const admin = await verifyAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  const { title, video_url, cover_url, category, is_featured, hero_type } = body;

  if (!title || !video_url) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Se estiver definindo um hero_type exclusivo, remover a flag de outra aula que o tenha
  if (hero_type === "LAUNCH" || hero_type === "FEATURED") {
    await prisma.lesson.updateMany({
      where: { hero_type },
      data: { hero_type: null },
    });
  }

  // Extract YouTube thumbnail if cover_url is empty
  let finalCoverUrl = cover_url || null;
  if (!finalCoverUrl && video_url) {
    const ytMatch = video_url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([^"&?\/\s]{11})/);
    if (ytMatch && ytMatch[1]) {
      finalCoverUrl = `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`;
    }
  }

  const lesson = await prisma.lesson.create({
    data: {
      title,
      video_url,
      cover_url: finalCoverUrl,
      category: category || null,
      is_featured: is_featured || false,
      hero_type: hero_type || null,
    },
  });

  return NextResponse.json(lesson, { status: 201 });
}
