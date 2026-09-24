"use server";

import { prisma } from "@/lib/prisma";

export async function getEbooks() {
  return prisma.ebook.findMany({
    orderBy: { created_at: "desc" },
  });
}

export async function getEbookById(id: string) {
  return prisma.ebook.findUnique({ where: { id } });
}

export async function createEbook(data: {
  title: string;
  description: string;
  category?: string;
  cover_url?: string;
  file_url: string;
}) {
  return prisma.ebook.create({ data });
}

export async function updateEbook(
  id: string,
  data: {
    title?: string;
    description?: string;
    category?: string;
    cover_url?: string;
    file_url?: string;
  }
) {
  return prisma.ebook.update({ where: { id }, data });
}

export async function deleteEbook(id: string) {
  return prisma.ebook.delete({ where: { id } });
}
