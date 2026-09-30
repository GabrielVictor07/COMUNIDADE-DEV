import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import { Hero } from "@/components/landing/Hero"
import { Features } from "@/components/landing/Features"
import { HowItWorks } from "@/components/landing/HowItWorks"
import { Pricing } from "@/components/landing/Pricing"
import { TargetAudience } from "@/components/landing/TargetAudience"
import { FAQ } from "@/components/landing/FAQ"
import { FinalCTA } from "@/components/landing/FinalCTA"
import { Footer } from "@/components/landing/Footer"

export default async function Home() {
  const session = await getSession()
  if (session) {
    redirect("/dashboard")
  }

  return (
    <main className="min-h-screen bg-[#050505]">
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <TargetAudience />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  )
}
