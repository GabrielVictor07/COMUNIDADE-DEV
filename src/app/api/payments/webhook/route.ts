import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
    const secretHeader = req.headers.get("x-webhook-secret")
    if (secretHeader !== process.env.WEBHOOK_SECRET) {
      return NextResponse.json({ error: "Invalid secret" }, { status: 400 })
    }

    const body = await req.json()
    const { payment_id, status, user_email, user_id, amount } = body

    if (!status || (!user_email && !user_id)) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const user = await prisma.user.findFirst({
      where: user_id ? { id: user_id } : { email: user_email },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 })
    }

    const isPaid = status === "paid" || status === "approved"
    const isRefunded = status === "refunded"

    if (isPaid) {
      await prisma.$transaction(async (tx) => {
        const existingPurchase = payment_id
          ? await tx.purchase.findFirst({ where: { payment_id } })
          : null

        if (existingPurchase) {
          await tx.purchase.update({
            where: { id: existingPurchase.id },
            data: { status: "PAID" },
          })
        } else {
          await tx.purchase.create({
            data: {
              user_id: user.id,
              payment_id: payment_id || null,
              amount: amount ?? 0,
              status: "PAID",
            },
          })
        }

        await tx.user.update({
          where: { id: user.id },
          data: { access_status: "ACTIVE" },
        })
      })
    } else if (isRefunded) {
      await prisma.$transaction(async (tx) => {
        if (payment_id) {
          await tx.purchase.updateMany({
            where: { payment_id },
            data: { status: "REFUNDED" },
          })
        }
        await tx.user.update({
          where: { id: user.id },
          data: { access_status: "INACTIVE" },
        })
      })
    }

    return NextResponse.json({ received: true }, { status: 200 })
  } catch {
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 400 })
  }
}
