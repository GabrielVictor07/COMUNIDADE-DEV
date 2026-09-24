"use client";

import { useState, useEffect } from "react";
import { Settings, Globe, Link as LinkIcon, Palette, CreditCard, Save, Star } from "lucide-react";

export default function AdminSettingsPage() {
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const [form, setForm] = useState({
    platformName: "",
    supportEmail: "",
    tiktokUrl: "",
    instagramUrl: "",
    primaryColor: "#E11D48",
    asaasKey: "",
    is_maintenance: false,
  });

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setForm({
            platformName: data.platformName || "",
            supportEmail: data.supportEmail || "",
            tiktokUrl: data.tiktokUrl || "",
            instagramUrl: data.instagramUrl || "",
            primaryColor: "#E11D48", // Estático por enquanto
            asaasKey: data.asaasKey || "",
            is_maintenance: data.is_maintenance ?? false,
          });
        }
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setNotification(null);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Erro ao salvar");
      setNotification({ text: "Configurações atualizadas com sucesso!", type: "success" });
    } catch (error) {
      console.error(error);
      setNotification({ text: "Erro ao salvar configurações.", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-white text-center py-20">Carregando configurações...</div>;
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Configurações Gerais</h1>
          <p className="text-sm text-gray-400">Personalize a plataforma e gerencie integrações.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-medium rounded-xl shadow-[0_0_15px_rgba(225,29,72,0.4)] hover:shadow-[0_0_25px_rgba(225,29,72,0.6)] transition-all disabled:opacity-50"
        >
          {saving ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          Salvar Alterações
        </button>
      </div>

      {notification && (
        <div className={`p-4 mb-6 rounded-xl border flex items-center gap-3 ${notification.type === "success" ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400" : "bg-red-500/10 border-red-500/50 text-red-400"}`}>
          <p className="text-sm font-medium">{notification.text}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Coluna Principal */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Card: Configurações Globais */}
          <div className="bg-black/20 backdrop-blur-3xl border border-white/5 p-6 rounded-2xl shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-rose-900/15 via-rose-900/5 to-transparent pointer-events-none"></div>
            
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Globe className="w-5 h-5 text-rose-500" />
              Informações da Plataforma
            </h2>
            
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-300">Nome da Plataforma</label>
                <input
                  type="text"
                  value={form.platformName}
                  onChange={(e) => setForm({ ...form, platformName: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all shadow-inner"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-300">E-mail de Suporte</label>
                <input
                  type="email"
                  value={form.supportEmail}
                  onChange={(e) => setForm({ ...form, supportEmail: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all shadow-inner"
                />
              </div>
            </div>
          </div>

          {/* Card: Redes Sociais */}
          <div className="bg-black/20 backdrop-blur-3xl border border-white/5 p-6 rounded-2xl shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-rose-900/15 via-rose-900/5 to-transparent pointer-events-none"></div>
            
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-rose-500" />
              Redes Sociais
            </h2>
            
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-300">TikTok URL</label>
                <input
                  type="url"
                  value={form.tiktokUrl}
                  onChange={(e) => setForm({ ...form, tiktokUrl: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all shadow-inner"
                />
                <p className="text-[11px] text-gray-500 mt-0.5">Link usado no widget de aviso do aluno.</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-300">Instagram URL</label>
                <input
                  type="url"
                  value={form.instagramUrl}
                  onChange={(e) => setForm({ ...form, instagramUrl: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all shadow-inner"
                />
              </div>
            </div>
          </div>

          {/* Card: Modo Manutenção */}
          <div className="bg-black/20 backdrop-blur-3xl border border-rose-500/20 p-6 rounded-2xl shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-rose-900/15 via-rose-900/5 to-transparent pointer-events-none"></div>
            <h2 className="text-lg font-bold text-rose-500 mb-6 flex items-center gap-2">
              <Star className="w-5 h-5" />
              Modo Manutenção
            </h2>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-4 p-4 border border-rose-500/20 rounded-xl bg-rose-500/5">
                <div className="pt-1">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={form.is_maintenance}
                      onChange={(e) => setForm({ ...form, is_maintenance: e.target.checked })}
                    />
                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
                  </label>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">Ativar Manutenção</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Ao ativar, todos os <strong>alunos</strong> serão redirecionados para a tela de manutenção. Você (Admin) continuará tendo acesso normal à plataforma e ao painel.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Coluna Lateral */}
        <div className="flex flex-col gap-6">
          
          {/* Card: Aparência */}
          <div className="bg-black/20 backdrop-blur-3xl border border-white/5 p-6 rounded-2xl shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-rose-900/15 via-rose-900/5 to-transparent pointer-events-none"></div>
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Palette className="w-5 h-5 text-rose-500" />
              Aparência
            </h2>
            
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-300">Cor Principal (Admin)</label>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-rose-600 shadow-[0_0_10px_rgba(225,29,72,0.6)] border-2 border-white/20"></div>
                  <div className="w-10 h-10 rounded-full bg-purple-600 border border-white/10 opacity-50 cursor-not-allowed"></div>
                  <div className="w-10 h-10 rounded-full bg-blue-600 border border-white/10 opacity-50 cursor-not-allowed"></div>
                </div>
                <p className="text-[11px] text-gray-500 mt-1">Troca de temas em breve.</p>
              </div>
            </div>
          </div>

          {/* Card: Financeiro / Integrações */}
          <div className="bg-black/20 backdrop-blur-3xl border border-white/5 p-6 rounded-2xl shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-rose-900/15 via-rose-900/5 to-transparent pointer-events-none"></div>
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-rose-500" />
              Financeiro
            </h2>
            
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-300">Asaas Access Token</label>
                <input
                  type="password"
                  value={form.asaasKey}
                  onChange={(e) => setForm({ ...form, asaasKey: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all shadow-inner text-sm font-mono"
                />
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
