import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }

    // Buscar o token
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!verificationToken) {
      return NextResponse.json({ error: "Token inválido ou expirado" }, { status: 400 });
    }

    if (verificationToken.expires < new Date()) {
      await prisma.verificationToken.delete({ where: { token } });
      return NextResponse.json({ error: "Token expirado" }, { status: 400 });
    }

    // Atualizar o usuário
    const hashedPassword = await bcrypt.hash(password, 12);
    
    await prisma.user.update({
      where: { email: verificationToken.identifier },
      data: { password_hash: hashedPassword },
    });

    // Deletar o token usado
    await prisma.verificationToken.delete({ where: { token } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro no reset-password:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
