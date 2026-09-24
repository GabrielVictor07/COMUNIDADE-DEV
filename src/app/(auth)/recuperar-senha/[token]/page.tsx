"use client";

import { useState, FormEvent, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Logo from "@/components/Logo";

export default function ResetPasswordPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const router = useRouter();
  const { token } = use(params);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erro ao redefinir a senha");
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err) {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md w-full mx-4">
      <div className="bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-8">
        
        <div className="flex justify-center mb-6 mt-2">
          <Logo className="h-10" />
        </div>
        
        <p className="text-gray-400 text-center mb-8">Definir nova senha</p>

        {success ? (
          <div className="bg-green-500/10 border border-green-500/50 rounded-xl px-4 py-4 text-green-400 text-sm text-center font-medium shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
            Senha redefinida com sucesso! Redirecionando para o login...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-xl px-4 py-3 text-red-400 text-sm text-center font-medium">
                {error}
              </div>
            )}
            <Input
              id="password"
              label="Nova Senha"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Input
              id="confirmPassword"
              label="Confirmar Nova Senha"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Button type="submit" loading={loading} className="w-full mt-2">
              Salvar Nova Senha
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
