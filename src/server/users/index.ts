"use server";

import { prisma } from "@/lib/prisma";

export async function getUsers(search?: string) {
  return prisma.user.findMany({
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
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({ where: { id } });
}

export async function updateUserAccess(
  id: string,
  access_status: "PENDING" | "ACTIVE" | "INACTIVE"
) {
  return prisma.user.update({
    where: { id },
    data: { access_status },
  });
}

export async function getUserStats() {
  const [total, active, pending] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { access_status: "ACTIVE" } }),
    prisma.user.count({ where: { access_status: "PENDING" } }),
  ]);

  return { total, active, pending };
}
