import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Comunidade Dev",
  description: "Plataforma de conteúdo premium para desenvolvedores",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} text-white/90 antialiased`}>
        {children}
      </body>
    </html>
  )
}
