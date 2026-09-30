import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log("Recebido Webhook da InfinitePay:", JSON.stringify(body, null, 2));

    // Salvar o payload em um arquivo para eu conseguir ler
    const filePath = path.join(process.cwd(), 'infinitepay-test-payload.json');
    fs.writeFileSync(filePath, JSON.stringify(body, null, 2), 'utf-8');

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Erro interno no Webhook InfinitePay:", error);
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}
