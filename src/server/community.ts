"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/permissions";
import { revalidatePath } from "next/cache";

export async function getPosts() {
  const user = await getCurrentUser();
  if (!user) throw new Error("Não autorizado");

  const posts = await prisma.post.findMany({
    orderBy: { created_at: "desc" },
    include: {
      user: { select: { id: true, name: true } },
      _count: { select: { comments: true } },
    },
  });

  return posts;
}

export async function getPost(id: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Não autorizado");

  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, name: true } },
      comments: {
        orderBy: { created_at: "asc" },
        include: {
          user: { select: { id: true, name: true } },
        },
      },
    },
  });

  return post;
}

export async function createPost(data: { title: string; content: string }) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Não autorizado");

  if (!data.title || data.title.trim().length < 3) {
    throw new Error("Título muito curto");
  }

  if (!data.content || data.content.trim().length < 5) {
    throw new Error("Conteúdo muito curto");
  }

  await prisma.post.create({
    data: {
      title: data.title.trim(),
      content: data.content.trim(),
      user_id: user.id,
    },
  });

  revalidatePath("/comunidade");
}

export async function createComment(data: { postId: string; content: string }) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Não autorizado");

  if (!data.content || data.content.trim().length < 2) {
    throw new Error("Comentário muito curto");
  }

  await prisma.comment.create({
    data: {
      content: data.content.trim(),
      post_id: data.postId,
      user_id: user.id,
    },
  });

  revalidatePath(`/comunidade/${data.postId}`);
}
