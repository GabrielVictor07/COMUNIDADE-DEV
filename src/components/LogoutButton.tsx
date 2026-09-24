"use client";

import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const handleLogout = async () => {
    const { signOut } = await import("next-auth/react");
    await signOut({ redirect: false });
    window.location.href = "/login";
  };

  return (
    <button onClick={handleLogout} className="flex items-center gap-2 text-white/50 hover:text-white transition-colors">
      <LogOut className="w-4 h-4" />
      Sair
    </button>
  );
}
