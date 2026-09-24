import { cookies } from "next/headers"
import { getServerSession } from "next-auth"
import { authOptions } from "./authOptions"
import { prisma } from "./prisma"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export async function createSession(userId: string): Promise<string> {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: "7d" })
  const cookieStore = await cookies()
  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  })
  return token
}

export async function getSession(): Promise<{ userId: string } | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get("session")?.value
  
  if (token) {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }
      return { userId: payload.userId }
    } catch {
      // Falha no JWT customizado, tentaremos NextAuth abaixo
    }
  }

  // Fallback para NextAuth
  const nextSession = await getServerSession(authOptions)
  if (nextSession?.user?.email) {
    const dbUser = await prisma.user.findUnique({ where: { email: nextSession.user.email } })
    if (dbUser) return { userId: dbUser.id }
  }

  return null
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete("session")
}
