import { NextRequest, NextResponse } from "next/server";
import { registerSchema } from "@/lib/validations";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Dados inválidos" },
        { status: 400 }
      );
    }

    const { name, email, password } = parsed.data;

    const existing = await prisma.user.findUnique({ where: { email } });

    if (existing) {
      if (existing.password_hash) {
        return NextResponse.json(
          { success: false, message: "Email já cadastrado" },
          { status: 400 }
        );
      } else {
        // Usuário criado via Google/Social, vamos adicionar a senha a ele.
        const hashed = await hashPassword(password);
        await prisma.user.update({
          where: { email },
          data: { password_hash: hashed },
        });
        return NextResponse.json(
          { success: true, message: "Conta vinculada com sucesso" },
          { status: 200 }
        );
      }
    }

    const hashed = await hashPassword(password);

    await prisma.user.create({
      data: {
        name,
        email,
        password_hash: hashed,
      },
    });

    return NextResponse.json(
      { success: true, message: "Conta criada com sucesso" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
