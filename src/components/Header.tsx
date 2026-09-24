"use client";

import Link from "next/link";
import Logo from "./Logo";

export default function Header() {
  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  };

  return (
    <header className="sticky top-0 z-30 h-20 bg-black/50 backdrop-blur-md border-b border-white/5 md:bg-transparent md:backdrop-blur-none md:border-none px-4 md:px-8 flex items-center justify-between">
      {/* Mobile Title */}
      <div className="flex items-center gap-2 mobile-only py-2">
        <Logo className="h-6" />
      </div>
    </header>
  );
}
