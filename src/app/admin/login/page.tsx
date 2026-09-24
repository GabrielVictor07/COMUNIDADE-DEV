"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { Shield } from "lucide-react";

export default function AdminLoginPage() {
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
      const { signIn } = await import("next-auth/react");
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Credenciais administrativas inválidas");
      } else {
        router.push("/admin");
      }
    } catch {
      setError("Erro ao conectar com o servidor");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden selection:bg-rose-500/30">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-[20%] left-[20%] w-[40%] h-[40%] bg-rose-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[20%] right-[20%] w-[40%] h-[40%] bg-red-900/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-md w-full">
        <div className="bg-black/40 backdrop-blur-3xl rounded-2xl border border-rose-500/20 shadow-[0_8px_32px_rgba(225,29,72,0.15)] p-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-red-700 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(225,29,72,0.4)]">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-white text-center mb-2 tracking-tight">
            Painel VIP
          </h1>
          <p className="text-rose-200/50 text-center mb-8 text-sm">
            Acesso restrito para administradores
          </p>

          {error && (
            <div className="bg-rose-500/10 border border-rose-500/50 rounded-xl px-4 py-3 mb-6 text-rose-400 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-300 ml-1">E-mail Administrativo</label>
              <Input
                id="email"
                type="email"
                placeholder="admin@comunidadedev.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-black/50 border-rose-500/20 focus:border-rose-500/50 text-white placeholder:text-gray-600"
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-300 ml-1">Senha de Acesso</label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-black/50 border-rose-500/20 focus:border-rose-500/50 text-white placeholder:text-gray-600"
              />
            </div>

            <Button 
              type="submit" 
              loading={loading} 
              className="w-full mt-4 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white border-0 shadow-[0_0_15px_rgba(225,29,72,0.4)] transition-all hover:shadow-[0_0_25px_rgba(225,29,72,0.6)] rounded-xl py-6"
            >
              Entrar no Painel
            </Button>
          </form>
          
          <div className="mt-8 text-center">
            <button 
              onClick={() => router.push('/login')}
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              &larr; Voltar para a área de alunos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
