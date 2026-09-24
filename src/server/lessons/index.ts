"use server";

import { prisma } from "@/lib/prisma";

export async function getLessons() {
  return prisma.lesson.findMany({
    orderBy: { created_at: "desc" },
  });
}

export async function getLessonById(id: string) {
  return prisma.lesson.findUnique({
    where: { id },
  });
}

export async function getFeaturedLessons(limit: number = 4) {
  return prisma.lesson.findMany({
    where: { is_featured: true },
    orderBy: { created_at: "desc" },
    take: limit,
  });
}

export async function getLaunchHero() {
  return prisma.lesson.findFirst({
    where: { hero_type: "LAUNCH" },
  });
}

export async function getFeaturedHero() {
  return prisma.lesson.findFirst({
    where: { hero_type: "FEATURED" },
  });
}
