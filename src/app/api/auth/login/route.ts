import { NextRequest, NextResponse } from "next/server";
import { loginSchema } from "@/lib/validations";
import { prisma } from "@/lib/prisma";
import { comparePassword, createSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Dados inválidos" },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Email ou senha incorretos" },
        { status: 401 }
      );
    }

    if (!user.password_hash) {
      return NextResponse.json(
        { success: false, message: "Use o login social (Google) para esta conta" },
        { status: 401 }
      );
    }

    const valid = await comparePassword(password, user.password_hash);

    if (!valid) {
      return NextResponse.json(
        { success: false, message: "Email ou senha incorretos" },
        { status: 401 }
      );
    }

    await createSession(user.id);

    return NextResponse.json(
      { success: true, message: "Login realizado com sucesso" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
