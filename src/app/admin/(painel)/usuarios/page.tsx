"use client";

import { useState, useEffect, useCallback } from "react";
import DataTable from "@/components/DataTable";
import { Search, ShieldAlert, ShieldCheck } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  access_status: string;
  created_at: string;
}

const statusColors: Record<string, string> = {
  ACTIVE: "bg-emerald-500/20 text-emerald-400 border-emerald-500/20",
  PENDING: "bg-amber-500/20 text-amber-400 border-amber-500/20",
  INACTIVE: "bg-rose-500/20 text-rose-400 border-rose-500/20",
};

const statusLabels: Record<string, string> = {
  ACTIVE: "Ativo",
  PENDING: "Pendente",
  INACTIVE: "Inativo",
};

export default function UsuariosPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    const params = search ? `?search=${encodeURIComponent(search)}` : "";
    const res = await fetch(`/api/admin/users${params}`);
    if (res.ok) {
      const data = await res.json();
      setUsers(data);
    }
    setLoading(false);
  }, [search]);

  useEffect(() => {
    const timeout = setTimeout(fetchUsers, 300);
    return () => clearTimeout(timeout);
  }, [fetchUsers]);

  const toggleStatus = async (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    setUpdatingId(userId);
    const res = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, access_status: newStatus }),
    });
    if (res.ok) {
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, access_status: newStatus } : u))
      );
    }
    setUpdatingId(null);
  };

  const columns = [
    { key: "name", label: "Nome" },
    { key: "email", label: "E-mail" },
    {
      key: "access_status",
      label: "Status",
      render: (value: string) => (
        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${statusColors[value] || ""}`}>
          {statusLabels[value] || value}
        </span>
      ),
    },
    {
      key: "created_at",
      label: "Cadastro em",
      render: (value: string) =>
        new Date(value).toLocaleDateString("pt-BR"),
    },
    {
      key: "id",
      label: "Ações",
      render: (_: string, row: User) => (
        <button
          onClick={() => toggleStatus(row.id, row.access_status)}
          disabled={updatingId === row.id}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
            row.access_status === "ACTIVE"
              ? "bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border-rose-500/20 hover:border-rose-500/40"
              : "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border-emerald-500/20 hover:border-emerald-500/40"
          } disabled:opacity-50`}
        >
          {updatingId === row.id ? (
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : row.access_status === "ACTIVE" ? (
            <>
              <ShieldAlert className="w-4 h-4" /> Suspender
            </>
          ) : (
            <>
              <ShieldCheck className="w-4 h-4" /> Ativar Acesso
            </>
          )}
        </button>
      ),
    },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Gerenciar Usuários</h1>
          <p className="text-sm text-gray-400">Controle de acessos, assinaturas e permissões.</p>
        </div>
      </div>

      <div className="bg-black/20 backdrop-blur-3xl border border-white/5 p-6 rounded-2xl shadow-xl flex flex-col gap-6">
        {/* Search Bar */}
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            placeholder="Buscar usuário por nome ou e-mail..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all shadow-inner text-sm"
          />
        </div>

        {/* Data Table */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-2 border-rose-500/30 border-t-rose-500 rounded-full animate-spin" />
          </div>
        ) : (
          <DataTable columns={columns} data={users} emptyMessage="Nenhum usuário encontrado." />
        )}
      </div>
    </div>
  );
}
