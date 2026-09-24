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

export async function GET(req: NextRequest) {
  const admin = await verifyAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const search = req.nextUrl.searchParams.get("search") || undefined;

  const users = await prisma.user.findMany({
    where: search
      ? {
          OR: [
            { name: { contains: search } },
            { email: { contains: search } },
          ],
        }
      : undefined,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      access_status: true,
      created_at: true,
    },
    orderBy: { created_at: "desc" },
  });

  return NextResponse.json(users);
}

export async function PATCH(req: NextRequest) {
  const admin = await verifyAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  const { userId, access_status } = body;

  if (!userId || !["PENDING", "ACTIVE", "INACTIVE"].includes(access_status)) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data: { access_status },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      access_status: true,
      created_at: true,
    },
  });

  return NextResponse.json(user);
}
