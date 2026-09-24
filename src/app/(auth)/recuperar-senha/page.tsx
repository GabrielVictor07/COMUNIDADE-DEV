"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Logo from "@/components/Logo";

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch (error) {
      console.error(error);
    } finally {
      setSent(true);
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md w-full mx-4">
      <div className="bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-8">
        
        <div className="flex justify-center mb-6 mt-2">
          <Logo className="h-10" />
        </div>
        
        <p className="text-gray-400 text-center mb-8">
          Digite seu email para recuperar o acesso.
        </p>

        {sent ? (
          <div className="bg-green-500/10 border border-green-500/50 rounded-xl px-4 py-4 text-green-400 text-sm text-center font-medium shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
            Se o email estiver cadastrado, você receberá instruções em breve.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <Input
              id="email"
              label="Email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" loading={loading} className="w-full mt-2">
              Enviar Link de Recuperação
            </Button>
          </form>
        )}

        <div className="mt-8 text-center">
          <Link
            href="/login"
            className="text-sm text-white/60 hover:text-purple-400 transition-colors font-medium flex items-center justify-center gap-2"
          >
            &larr; Voltar para o login
          </Link>
        </div>
      </div>
    </div>
  );
}
