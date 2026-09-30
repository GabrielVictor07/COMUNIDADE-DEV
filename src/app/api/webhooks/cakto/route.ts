import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log("Recebido Webhook da Cakto:", JSON.stringify(body, null, 2));

    // const filePath = path.join(process.cwd(), 'cakto-test-payload.json');
    // fs.writeFileSync(filePath, JSON.stringify(body, null, 2), 'utf-8');

    const event = body.event;
    const data = body.data;

    if (event === "purchase_approved" && data?.customer?.email) {
      const email = data.customer.email;
      const paymentId = data.id;
      const amount = data.amount || 0;

      // Procurar o usuário pelo email
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (user) {
        // Atualiza o acesso para ACTIVE
        await prisma.user.update({
          where: { id: user.id },
          data: { access_status: "ACTIVE" },
        });

        // Salvar a compra no histórico
        await prisma.purchase.create({
          data: {
            user_id: user.id,
            payment_id: paymentId,
            amount: amount,
            status: "PAID",
          },
        });

        console.log(`✅ Acesso liberado para o e-mail: ${email}`);
      } else {
        console.warn(`⚠️ E-mail pago não encontrado no banco: ${email}`);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Erro interno no Webhook da Cakto:", error);
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}
