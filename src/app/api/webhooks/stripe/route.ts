import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20" as any,
});

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  let event: Stripe.Event;

  try {
    // Se você configurar o STRIPE_WEBHOOK_SECRET, ele faz a verificação criptográfica
    if (process.env.STRIPE_WEBHOOK_SECRET && signature) {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } else {
      // Falha se não conseguir validar, mas para testar rápido você pode fazer um bypass se necessário
      // event = JSON.parse(body); // (Descomente apenas se for bypassar a assinatura para testes manuais no insomnia)
      event = stripe.webhooks.constructEvent(
        body,
        signature || "",
        process.env.STRIPE_WEBHOOK_SECRET || ""
      );
    }
  } catch (err: any) {
    console.error(`⚠️  Webhook signature verification failed.`, err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  try {
    // Processar o evento de acordo com o tipo
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.client_reference_id;

        if (userId) {
          // Pagamento aprovado! Liberar acesso.
          await prisma.user.update({
            where: { id: userId },
            data: { access_status: "ACTIVE" },
          });
          console.log(`✅ Acesso liberado para usuário ID: ${userId}`);
        } else {
          console.warn("Sessão completada mas sem client_reference_id.");
        }
        break;
      }
      
      // Lidar com boletos pagos tardiamente ou transferências bank_transfer
      case "checkout.session.async_payment_succeeded": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.client_reference_id;

        if (userId) {
          await prisma.user.update({
            where: { id: userId },
            data: { access_status: "ACTIVE" },
          });
          console.log(`✅ Acesso liberado (Async) para usuário ID: ${userId}`);
        }
        break;
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Erro interno no Webhook Stripe:", error);
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}
