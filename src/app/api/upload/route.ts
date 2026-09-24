import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/permissions";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();

    const data = await req.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Garantir que a pasta public/uploads existe
    const uploadDir = path.join(process.cwd(), "public/uploads");
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (e) {
      // ignora se já existe
    }

    // Criar um nome único
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const originalName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, ""); // limpa caracteres
    const filename = `${uniqueSuffix}-${originalName}`;
    const filepath = path.join(uploadDir, filename);

    // Salvar o arquivo localmente
    await writeFile(filepath, buffer);

    // Retornar a URL pública (sem "/public", pois ele serve da raiz "/")
    const url = `/uploads/${filename}`;

    return NextResponse.json({ url });
  } catch (error: any) {
    console.error("Erro no upload:", error);
    return NextResponse.json(
      { error: "Não autorizado ou erro interno." },
      { status: 401 }
    );
  }
}
