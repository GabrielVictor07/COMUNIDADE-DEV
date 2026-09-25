"use client";

import { useState, useEffect } from "react";
import DataTable from "@/components/DataTable";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import FileUpload from "@/components/FileUpload";
import { Plus, Pencil, Trash2, PlayCircle, Folder, Star } from "lucide-react";

function getYouTubeThumbnail(url: string) {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([^"&?\/\s]{11})/);
  return match && match[1] ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null;
}

function getValidCoverUrl(lesson: any) {
  if (lesson.cover_url && !lesson.cover_url.startsWith("/uploads/")) {
    return lesson.cover_url;
  }
  return getYouTubeThumbnail(lesson.video_url);
}

interface Lesson {
  id: string;
  title: string;
  video_url: string;
  cover_url: string | null;
  category: string | null;
  is_featured: boolean;
  hero_type: "LAUNCH" | "FEATURED" | null;
  created_at: string;
}

interface LessonForm {
  title: string;
  video_url: string;
  cover_url: string;
  category: string;
  is_featured: boolean;
  hero_type: "LAUNCH" | "FEATURED" | null;
}

const emptyForm: LessonForm = {
  title: "",
  video_url: "",
  cover_url: "",
  category: "",
  is_featured: false,
  hero_type: null,
};

export default function AulasPage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<LessonForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/lessons");
    if (res.ok) setLessons(await res.json());
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (lesson: Lesson) => {
    setEditingId(lesson.id);
    setForm({
      title: lesson.title,
      video_url: lesson.video_url,
      cover_url: lesson.cover_url || "",
      category: lesson.category || "",
      is_featured: lesson.is_featured || false,
      hero_type: lesson.hero_type || null,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const url = editingId ? `/api/admin/lessons/${editingId}` : "/api/admin/lessons";
    const method = editingId ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setModalOpen(false);
      fetchData();
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta aula? O vídeo será mantido no YouTube, mas sairá do sistema.")) return;
    setDeleting(id);
    const res = await fetch(`/api/admin/lessons/${id}`, { method: "DELETE" });
    if (res.ok) setLessons((prev) => prev.filter((l) => l.id !== id));
    setDeleting(null);
  };

  const columns = [
    { 
      key: "cover", 
      label: "Capa",
      render: (_: any, row: Lesson) => (
        <div className="w-16 h-10 rounded-md overflow-hidden bg-white/5 border border-white/10 flex-shrink-0">
          {getValidCoverUrl(row) ? (
            <img src={getValidCoverUrl(row)!} alt="Capa" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/30 text-[10px]">Sem Capa</div>
          )}
        </div>
      )
    },
    { key: "title", label: "Título" },
    {
      key: "category",
      label: "Categoria",
      render: (_: any, row: Lesson) => row.category || <span className="text-white/30">-</span>,
    },
    {
      key: "video_url",
      label: "Link do Vídeo",
      render: (_: any, row: Lesson) => (
        <a 
          href={row.video_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-purple-400 hover:text-purple-300 underline text-sm max-w-[200px] truncate block"
        >
          Assistir
        </a>
      )
    },
    {
      key: "is_featured",
      label: "Em Destaque",
      render: (_: any, row: Lesson) => row.is_featured ? <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> : <span className="text-white/30">-</span>,
    },
    {
      key: "hero",
      label: "Hero Card",
      render: (_: any, row: Lesson) => {
        if (row.hero_type === "LAUNCH") return <span className="px-2 py-1 text-[10px] bg-rose-500/20 text-rose-400 rounded-md border border-rose-500/30">Lançamento</span>;
        if (row.hero_type === "FEATURED") return <span className="px-2 py-1 text-[10px] bg-blue-500/20 text-blue-400 rounded-md border border-blue-500/30">Destaque</span>;
        return <span className="text-white/30">-</span>;
      }
    },
    {
      key: "id",
      label: "Ações",
      render: (_: string, row: Lesson) => (
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
          <h1 className="text-2xl font-bold text-white mb-1">Catálogo de Aulas</h1>
          <p className="text-sm text-gray-400">Gerencie todos os vídeos e tutorias da plataforma.</p>
        </div>
        <button 
          onClick={openCreate}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-medium rounded-xl shadow-[0_0_15px_rgba(225,29,72,0.4)] hover:shadow-[0_0_25px_rgba(225,29,72,0.6)] transition-all"
        >
          <Plus className="w-4 h-4" />
          Cadastrar Aula
        </button>
      </div>

      <div className="bg-black/20 backdrop-blur-3xl border border-white/5 p-6 rounded-2xl shadow-xl">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-2 border-rose-500/30 border-t-rose-500 rounded-full animate-spin" />
          </div>
        ) : (
          <DataTable columns={columns} data={lessons} emptyMessage="Nenhuma aula cadastrada. Comece adicionando um vídeo novo!" />
        )}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingId ? "Editar Aula" : "Nova Aula"}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Input
            label="Título da Aula"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Ex: Como criar uma API no Next.js"
            required
          />
          
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <PlayCircle className="w-4 h-4 text-rose-500" />
              Link do Vídeo (YouTube)
            </label>
            <input
              type="url"
              value={form.video_url}
              onChange={(e) => setForm({ ...form, video_url: e.target.value })}
              placeholder="Ex: https://www.youtube.com/embed/dQw4w9WgXcQ"
              required
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all shadow-inner"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Folder className="w-4 h-4 text-rose-500" />
              Categoria
            </label>
            <input
              type="text"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              placeholder="Ex: React, Backend, Dicas"
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all shadow-inner"
            />
            <span className="text-[10px] text-gray-500">Usada para organizar e filtrar as aulas no sistema.</span>
          </div>

          <div className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-xl px-4 py-3">
            <input
              type="checkbox"
              id="is_featured"
              checked={form.is_featured}
              onChange={(e) => setForm({ ...form, is_featured: e.target.checked })}
              className="w-4 h-4 rounded bg-black/50 border-white/20 text-rose-500 focus:ring-rose-500 focus:ring-offset-gray-900"
            />
            <label htmlFor="is_featured" className="text-sm font-medium text-gray-300 flex items-center gap-2 cursor-pointer">
              <Star className="w-4 h-4 text-yellow-500" />
              Destacar na página inicial
            </label>
          </div>

          <div className="flex flex-col gap-3 bg-black/40 border border-white/10 rounded-xl p-4">
            <span className="text-sm font-medium text-gray-300">Exibir no Painel Superior (Hero)</span>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="hero_type"
                  checked={form.hero_type === null}
                  onChange={() => setForm({ ...form, hero_type: null })}
                  className="w-4 h-4 text-rose-500 focus:ring-rose-500 bg-black/50 border-white/20"
                />
                <span className="text-sm text-gray-400">Não exibir nos cartões gigantes (Padrão)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="hero_type"
                  checked={form.hero_type === "LAUNCH"}
                  onChange={() => setForm({ ...form, hero_type: "LAUNCH" })}
                  className="w-4 h-4 text-rose-500 focus:ring-rose-500 bg-black/50 border-white/20"
                />
                <span className="text-sm text-gray-300">Exibir como "Lançamento"</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="hero_type"
                  checked={form.hero_type === "FEATURED"}
                  onChange={() => setForm({ ...form, hero_type: "FEATURED" })}
                  className="w-4 h-4 text-rose-500 focus:ring-rose-500 bg-black/50 border-white/20"
                />
                <span className="text-sm text-gray-300">Exibir como "Destaque Principal"</span>
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Input
              label="URL da Imagem de Capa (Opcional)"
              value={form.cover_url}
              onChange={(e) => setForm({ ...form, cover_url: e.target.value })}
              placeholder="Deixe em branco para usar a capa do YouTube"
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
                editingId ? "Salvar Alterações" : "Cadastrar Aula"
              )}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
