import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { updateAnnouncement, deleteAnnouncement } from "@/server/announcements";
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

  try {
    const announcement = await updateAnnouncement(id, body);
    return NextResponse.json(announcement);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update announcement" }, { status: 400 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await verifyAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;

  try {
    await deleteAnnouncement(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete announcement" }, { status: 400 });
  }
}
