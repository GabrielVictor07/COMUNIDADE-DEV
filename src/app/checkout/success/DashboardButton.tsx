"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PlayCircle, Loader2 } from "lucide-react";

export default function DashboardButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRedirect = () => {
    setIsLoading(true);
    router.push("/dashboard");
  };

  return (
    <button
      onClick={handleRedirect}
      disabled={isLoading}
      className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-[0_0_20px_rgba(147,51,234,0.4)] hover:shadow-[0_0_30px_rgba(147,51,234,0.6)] hover:-translate-y-1 disabled:opacity-70 disabled:hover:-translate-y-0 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <PlayCircle className="w-5 h-5" />
      )}
      {isLoading ? "Acessando a plataforma..." : "Acessar a Plataforma"}
    </button>
  );
}
