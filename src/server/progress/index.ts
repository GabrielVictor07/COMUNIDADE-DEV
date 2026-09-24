"use server";

import { prisma } from "@/lib/prisma";

export async function getUserProgress(userId: string, lessonId: string) {
  return prisma.userProgress.findUnique({
    where: {
      user_id_lesson_id: { user_id: userId, lesson_id: lessonId },
    },
  });
}

export async function getUserAllProgress(userId: string) {
  return prisma.userProgress.findMany({
    where: {
      user_id: userId,
    },
  });
}

export async function getLastWatchedLesson(userId: string) {
  return prisma.userProgress.findFirst({
    where: { user_id: userId, completed: false },
    orderBy: { updated_at: 'desc' },
    include: { lesson: true }
  });
}

export async function updateProgress(
  userId: string,
  lessonId: string,
  progress: number,
  completed: boolean
) {
  return prisma.userProgress.upsert({
    where: {
      user_id_lesson_id: { user_id: userId, lesson_id: lessonId },
    },
    create: {
      user_id: userId,
      lesson_id: lessonId,
      progress,
      completed,
    },
    update: {
      progress,
      completed,
    },
  });
}
