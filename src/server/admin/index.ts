"use server";

import { prisma } from "@/lib/prisma";

export async function getAdminStats() {
  const [
    totalUsers,
    activeUsers,
    pendingUsers,
    totalLessons,
    totalEbooks,
    totalPurchases,
    paidPurchases,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { access_status: "ACTIVE" } }),
    prisma.user.count({ where: { access_status: "PENDING" } }),
    prisma.lesson.count(),
    prisma.ebook.count(),
    prisma.purchase.count(),
    prisma.purchase.count({ where: { status: "PAID" } }),
  ]);

  return {
    totalUsers,
    activeUsers,
    pendingUsers,
    totalLessons,
    totalEbooks,
    totalPurchases,
    paidPurchases,
  };
}
