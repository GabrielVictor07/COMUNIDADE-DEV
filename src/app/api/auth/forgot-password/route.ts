import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendPasswordResetEmail } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "E-mail é obrigatório" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Não queremos revelar se o email existe ou não por segurança.
      // Apenas retornamos sucesso simulado.
      return NextResponse.json({ success: true });
    }

    // Gerar token simples usando a data e um random string
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24 horas

    // Salvar no banco
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires,
      },
    });

    // Enviar email
    await sendPasswordResetEmail(email, token);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro no forgot-password:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
