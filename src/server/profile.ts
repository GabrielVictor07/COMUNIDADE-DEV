"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/permissions";
import { revalidatePath } from "next/cache";
import { comparePassword, hashPassword } from "@/lib/auth";

export async function getMyProfile() {
  const user = await getCurrentUser();
  if (!user) throw new Error("Não autorizado");
  
  const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
  
  return { 
    name: dbUser?.name || "", 
    email: dbUser?.email || "",
    bio: dbUser?.bio || "",
    githubUrl: dbUser?.githubUrl || "",
    instagramUrl: dbUser?.instagramUrl || ""
  };
}

export async function updateProfile(data: { name: string; bio?: string; githubUrl?: string; instagramUrl?: string }) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Não autorizado");
  }

  if (!data.name || data.name.trim().length < 2) {
    throw new Error("Nome muito curto");
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { 
      name: data.name.trim(),
      bio: data.bio?.trim() || null,
      githubUrl: data.githubUrl?.trim() || null,
      instagramUrl: data.instagramUrl?.trim() || null
    },
  });

  revalidatePath("/perfil");
  revalidatePath("/", "layout");
}

export async function updatePassword(data: { currentPassword: string; newPassword: string }) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Não autorizado");
  }

  if (!data.newPassword || data.newPassword.length < 6) {
    throw new Error("A nova senha deve ter no mínimo 6 caracteres");
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
  });

  if (!dbUser) {
    throw new Error("Usuário não encontrado");
  }

  if (!dbUser.password_hash) {
    throw new Error("Sua conta foi criada usando Google. Não é possível alterar a senha.");
  }

  const isValid = await comparePassword(data.currentPassword, dbUser.password_hash);
  if (!isValid) {
    throw new Error("Senha atual incorreta");
  }

  const newHash = await hashPassword(data.newPassword);

  await prisma.user.update({
    where: { id: user.id },
    data: { password_hash: newHash },
  });
}
