"use server";

import { prisma } from "@/lib/prisma";

export async function getPurchases() {
  return prisma.purchase.findMany({
    include: {
      user: { select: { name: true, email: true } },
    },
    orderBy: { created_at: "desc" },
  });
}

export async function createPurchase(data: {
  user_id: string;
  payment_id?: string;
  amount: number;
}) {
  return prisma.purchase.create({ data });
}

export async function updatePurchaseStatus(
  id: string,
  status: "PENDING" | "PAID" | "CANCELED" | "REFUNDED"
) {
  if (status === "PAID") {
    return prisma.$transaction(async (tx) => {
      const purchase = await tx.purchase.update({
        where: { id },
        data: { status },
      });

      await tx.user.update({
        where: { id: purchase.user_id },
        data: { access_status: "ACTIVE" },
      });

      return purchase;
    });
  }

  return prisma.purchase.update({
    where: { id },
    data: { status },
  });
}
