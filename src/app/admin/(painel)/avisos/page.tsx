"use client";

import { useState, useEffect } from "react";
import DataTable from "@/components/DataTable";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import { Plus, Pencil, Trash2, Megaphone } from "lucide-react";

interface Announcement {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

export default function AvisosAdminPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", content: "" });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/announcements");
    if (res.ok) setAnnouncements(await res.json());
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm({ title: "", content: "" });
    setModalOpen(true);
  };

  const openEdit = (announcement: Announcement) => {
    setEditingId(announcement.id);
    setForm({
      title: announcement.title,
      content: announcement.content,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setNotification(null);
    const url = editingId ? `/api/admin/announcements/${editingId}` : "/api/admin/announcements";
    const method = editingId ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setModalOpen(false);
      setNotification({ text: "Aviso salvo com sucesso!", type: "success" });
      fetchData();
    } else {
      setNotification({ text: "Erro ao salvar o aviso.", type: "error" });
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este aviso?")) return;
    setDeleting(id);
    const res = await fetch(`/api/admin/announcements/${id}`, { method: "DELETE" });
    if (res.ok) setAnnouncements((prev) => prev.filter((e) => e.id !== id));
    setDeleting(null);
  };

  const columns = [
    { 
      key: "icon", 
      label: "",
      render: () => (
        <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center flex-shrink-0">
          <Megaphone className="w-5 h-5 text-rose-500" />
        </div>
      )
    },
    { key: "title", label: "Título do Aviso" },
    {
      key: "created_at",
      label: "Publicado em",
      render: (value: string) => new Date(value).toLocaleDateString("pt-BR"),
    },
    {
      key: "id",
      label: "Ações",
      render: (_: string, row: Announcement) => (
        <div className="flex gap-2">
          <button
            onClick={() => openEdit(row)}
            className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-rose-500/20 transition-all border border-transparent hover:border-rose-500/30"
            title="Editar"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            disabled={deleting === row.id}
            className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-red-500/40 transition-all border border-transparent hover:border-red-500/50 disabled:opacity-50"
            title="Excluir"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Mural de Avisos</h1>
          <p className="text-sm text-gray-400">Comunique novidades e atualizações aos alunos.</p>
        </div>
        <button 
          onClick={openCreate}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-medium rounded-xl shadow-[0_0_15px_rgba(225,29,72,0.4)] hover:shadow-[0_0_25px_rgba(225,29,72,0.6)] transition-all"
        >
          <Plus className="w-4 h-4" />
          Novo Aviso
        </button>
      </div>

      {notification && (
        <div className={`p-4 mb-6 rounded-xl border flex items-center gap-3 ${notification.type === "success" ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400" : "bg-red-500/10 border-red-500/50 text-red-400"}`}>
          <p className="text-sm font-medium">{notification.text}</p>
        </div>
      )}

      <div className="bg-black/20 backdrop-blur-3xl border border-white/5 p-6 rounded-2xl shadow-xl">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-2 border-rose-500/30 border-t-rose-500 rounded-full animate-spin" />
          </div>
        ) : (
          <DataTable columns={columns} data={announcements} emptyMessage="Nenhum aviso publicado." />
        )}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingId ? "Editar Aviso" : "Novo Aviso"}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Input
            label="Título Principal"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Ex: Novo módulo de Next.js disponível!"
            required
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-300">Mensagem</label>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              placeholder="Escreva a mensagem para seus alunos..."
              required
              rows={4}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all shadow-inner resize-none"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-white/10 mt-2">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-5 py-2.5 text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center justify-center min-w-[120px] px-5 py-2.5 bg-rose-600 hover:bg-rose-500 disabled:bg-rose-600/50 text-white font-medium rounded-xl transition-all shadow-[0_0_15px_rgba(225,29,72,0.3)]"
            >
              {saving ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                editingId ? "Salvar Alterações" : "Publicar Aviso"
              )}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
