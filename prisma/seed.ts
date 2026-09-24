import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const adminPassword = await bcrypt.hash("admin123", 12)
  const userPassword = await bcrypt.hash("user123", 12)

  const admin = await prisma.user.upsert({
    where: { email: "admin@comunidadedev.com" },
    update: {},
    create: {
      name: "Administrador",
      email: "admin@comunidadedev.com",
      password_hash: adminPassword,
      role: "ADMIN",
      access_status: "ACTIVE",
    },
  })

  const user = await prisma.user.upsert({
    where: { email: "dev@comunidadedev.com" },
    update: {},
    create: {
      name: "Dev Membro",
      email: "dev@comunidadedev.com",
      password_hash: userPassword,
      role: "USER",
      access_status: "ACTIVE",
    },
  })

  await prisma.lesson.createMany({
    data: [
      {
        title: "Aula 01 — Introdução ao JavaScript",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        cover_url: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800",
        category: "Frontend",
      },
      {
        title: "Aula 02 — Variáveis e Tipos de Dados",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        cover_url: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800",
        category: "Frontend",
      },
    ],
  })

  await prisma.ebook.create({
    data: {
      title: "Guia Prático de React & Next.js",
      description: "Aprenda a construir aplicações full-stack modernas e escaláveis.",
      category: "Frontend",
      cover_url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
      file_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
  })

  console.log("Seed concluído com sucesso!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
