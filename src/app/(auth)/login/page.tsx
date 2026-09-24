"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Logo from "@/components/Logo";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Email ou senha inválidos");
      } else {
        router.push("/dashboard");
      }
    } catch {
      setError("Erro ao conectar com o servidor");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md w-full mx-4">
      <div className="bg-white/5 backdrop-blur-2xl rounded-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-6">
        <div className="flex justify-center mb-6 mt-2">
          <Logo className="h-10" />
        </div>
        <p className="text-gray-400 text-center mb-8">Acesse sua conta</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-lg px-4 py-3 mb-6 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            id="email"
            label="Email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            id="password"
            label="Senha"
            type="password"
            placeholder="••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" loading={loading} className="w-full mt-2">
            Entrar
          </Button>
        </form>

        <div className="my-6 flex items-center justify-between">
          <hr className="w-full border-white/10" />
          <span className="p-2 text-white/50 text-sm bg-transparent">ou</span>
          <hr className="w-full border-white/10" />
        </div>

        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full flex items-center justify-center gap-3 bg-white text-black font-medium py-3 px-4 rounded-xl hover:bg-gray-100 transition-colors z-20 relative cursor-pointer"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Entrar com Google
        </button>

        <div className="mt-6 text-center space-y-2">
          <Link
            href="/recuperar-senha"
            className="text-sm text-white/60 hover:text-purple-400 transition block"
          >
            Esqueceu a senha?
          </Link>
          <Link
            href="/cadastro"
            className="text-sm text-white/60 hover:text-purple-400 transition block"
          >
            Não tem conta? <span className="text-purple-400 font-medium">Cadastre-se</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
