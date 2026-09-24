import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/permissions";
import { getSettings } from "@/server/settings";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20" as any, // Utilizando uma versão recente
});

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (user.access_status === "ACTIVE") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    const settings = await getSettings();
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // Criar a sessão de checkout do Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "boleto"], // Se quiser adicionar PIX, a conta Stripe BR já tem suporte nativo
      customer_email: user.email,
      client_reference_id: user.id, // Fundamental para o webhook identificar quem pagou
      line_items: [
        {
          price_data: {
            currency: "brl",
            product_data: {
              name: `Acesso Vitalício - ${settings.platformName}`,
              description: "Acesso completo à plataforma",
            },
            unit_amount: 2990, // Valor em centavos (R$ 29,90)
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/checkout`,
      // Coletar o CPF se quiser, muito útil para Brasil:
      tax_id_collection: {
        enabled: true,
      },
    });

    if (!session.url) {
      throw new Error("Falha ao gerar URL de checkout do Stripe");
    }

    return NextResponse.redirect(session.url);
  } catch (error) {
    console.error("Erro no checkout Stripe:", error);
    return NextResponse.redirect(new URL("/checkout?error=internal", request.url));
  }
}

