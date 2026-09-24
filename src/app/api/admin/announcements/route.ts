import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getAnnouncements, createAnnouncement } from "@/server/announcements";
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

  const announcements = await getAnnouncements();
  return NextResponse.json(announcements);
}

export async function POST(req: NextRequest) {
  const admin = await verifyAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  const { title, content } = body;

  if (!title || !content) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const announcement = await createAnnouncement({ title, content });
  return NextResponse.json(announcement, { status: 201 });
}
