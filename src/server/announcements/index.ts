import { prisma } from "@/lib/prisma";

export async function getAnnouncements() {
  return prisma.announcement.findMany({
    orderBy: { created_at: "desc" },
  });
}

export async function getAnnouncementById(id: string) {
  return prisma.announcement.findUnique({
    where: { id },
  });
}

export async function createAnnouncement(data: {
  title: string;
  content: string;
}) {
  return prisma.announcement.create({
    data,
  });
}

export async function updateAnnouncement(
  id: string,
  data: {
    title?: string;
    content?: string;
  }
) {
  return prisma.announcement.update({
    where: { id },
    data,
  });
}

export async function deleteAnnouncement(id: string) {
  return prisma.announcement.delete({
    where: { id },
  });
}
