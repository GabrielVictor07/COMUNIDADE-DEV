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

  const ebooks = await prisma.ebook.findMany({
    orderBy: { created_at: "desc" },
  });

  return NextResponse.json(ebooks);
}

export async function POST(req: NextRequest) {
  const admin = await verifyAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  const { title, description, category, cover_url, file_url } = body;

  if (!title || !description || !file_url) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const ebook = await prisma.ebook.create({
    data: {
      title,
      description,
      category: category || null,
      cover_url: cover_url || null,
      file_url,
    },
  });

  return NextResponse.json(ebook, { status: 201 });
}
