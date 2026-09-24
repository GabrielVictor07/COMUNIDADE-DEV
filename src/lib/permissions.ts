import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "./authOptions"
import { prisma } from "./prisma"

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)
  if (!session || !session.user || !session.user.email) return null
  
  // Optionally fetch fresh from DB or just use session data
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, name: true, email: true, role: true, access_status: true, image: true },
  })
  
  if (!user) return null
  return user
}

export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) redirect("/api/auth/logout")
  return user
}

export async function requireAdmin() {
  const user = await getCurrentUser()
  if (!user) redirect("/api/auth/logout")
  if (user.role !== "ADMIN") redirect("/dashboard")
  return user
}

export async function requireActiveAccess() {
  const user = await getCurrentUser()
  if (!user) redirect("/api/auth/logout")
  if (user.access_status !== "ACTIVE") redirect("/checkout")
  return user
}
