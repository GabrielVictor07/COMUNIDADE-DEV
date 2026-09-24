"use client";

import { useState, useEffect } from "react";
import { updateProfile, updatePassword, getMyProfile } from "@/server/profile";
import { User, Shield, Camera, Lock, Mail, Link as LinkIcon, Instagram, Github } from "lucide-react";

export default function PerfilPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [profileMsg, setProfileMsg] = useState({ type: "", text: "" });

  useEffect(() => {
    getMyProfile().then((data) => {
      setName(data.name || "");
      setEmail(data.email || "");
      setBio(data.bio || "");
      setGithubUrl(data.githubUrl || "");
      setInstagramUrl(data.instagramUrl || "");
    }).catch(console.error);
  }, []);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loadingPass, setLoadingPass] = useState(false);
  const [passMsg, setPassMsg] = useState({ type: "", text: "" });

  async function handleUpdateProfile(e: React.FormEvent) {
    e.preventDefault();
    setProfileMsg({ type: "", text: "" });
    setLoadingProfile(true);

    try {
      await updateProfile({ name, bio, githubUrl, instagramUrl });
      setProfileMsg({ type: "success", text: "Perfil atualizado com sucesso!" });
    } catch (err: any) {
      setProfileMsg({ type: "error", text: err.message || "Erro ao atualizar perfil" });
    } finally {
      setLoadingProfile(false);
    }
  }

  async function handleUpdatePassword(e: React.FormEvent) {
    e.preventDefault();
    setPassMsg({ type: "", text: "" });
    setLoadingPass(true);

    try {
      await updatePassword({ currentPassword, newPassword });
      setPassMsg({ type: "success", text: "Senha atualizada com sucesso!" });
      setCurrentPassword("");
      setNewPassword("");
    } catch (err: any) {
      setPassMsg({ type: "error", text: err.message || "Erro ao atualizar senha" });
    } finally {
      setLoadingPass(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header do Perfil */}
      <div className="relative mb-12">
        {/* Banner */}
        <div className="w-full h-48 rounded-3xl bg-gradient-to-r from-purple-900/40 via-blue-900/40 to-black/20 border border-white/5 overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/80"></div>
        </div>

        {/* Avatar e Infos */}
        <div className="absolute -bottom-6 left-8 flex items-end gap-6">
          <div className="relative group">
            <div className="w-28 h-28 rounded-full bg-black border-4 border-black overflow-hidden relative shadow-[0_0_20px_rgba(168,85,247,0.3)]">
              <div className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-4xl font-bold text-white">
                {name ? name.charAt(0).toUpperCase() : "U"}
              </div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-purple-500 border-4 border-black flex items-center justify-center shadow-[0_0_10px_rgba(168,85,247,0.8)]">
              <Shield className="w-3 h-3 text-white" />
            </div>
          </div>
          <div className="mb-2">
            <h1 className="text-3xl font-bold text-white tracking-tight drop-shadow-md">{name || "Seu Nome"}</h1>
            <p className="text-purple-400 font-medium text-sm drop-shadow-md">Membro da Comunidade</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
        
        {/* Coluna da Esquerda (Formulário Principal) */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          {/* Informações Pessoais */}
          <div className="bg-gradient-to-br from-purple-600/10 via-black/20 to-transparent backdrop-blur-3xl border border-white/5 p-8 rounded-3xl shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            
            <div className="mb-8">
              <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                <User className="w-5 h-5 text-purple-400" />
                Informações Pessoais
              </h2>
              <p className="text-sm text-gray-400 ml-7">Gerencie seus dados públicos e informações de contato.</p>
            </div>

            {profileMsg.text && (
              <div className={`mb-6 px-4 py-3 rounded-xl text-sm font-medium border ${profileMsg.type === "error" ? "bg-red-500/10 text-red-400 border-red-500/20" : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"}`}>
                {profileMsg.text}
              </div>
            )}

            <form onSubmit={handleUpdateProfile} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-300">Nome de Exibição</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Como quer ser chamado"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all shadow-inner"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-300">E-mail de Acesso</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                      type="email"
                      value={email}
                      disabled
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white/50 cursor-not-allowed shadow-inner"
                    />
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1">O e-mail não pode ser alterado por aqui.</p>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-300">Biografia (Opcional)</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Conte um pouco sobre você e o que está estudando..."
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all shadow-inner resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end border-t border-white/10 mt-2">
                <button
                  type="submit"
                  disabled={loadingProfile}
                  className="flex items-center justify-center min-w-[160px] px-6 py-3 bg-purple-600 hover:bg-purple-500 disabled:bg-purple-600/50 text-white font-semibold rounded-xl transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                >
                  {loadingProfile ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    "Salvar Informações"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Coluna da Direita (Segurança e Redes) */}
        <div className="flex flex-col gap-8">
          
          {/* Segurança */}
          <div className="bg-gradient-to-br from-blue-600/10 via-black/20 to-transparent backdrop-blur-3xl border border-white/5 p-8 rounded-3xl shadow-xl relative overflow-hidden">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                <Lock className="w-5 h-5 text-blue-400" />
                Segurança
              </h2>
              <p className="text-sm text-gray-400 ml-7">Atualize sua senha para manter sua conta protegida.</p>
            </div>

            {passMsg.text && (
              <div className={`mb-6 px-4 py-3 rounded-xl text-sm font-medium border ${passMsg.type === "error" ? "bg-red-500/10 text-red-400 border-red-500/20" : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"}`}>
                {passMsg.text}
              </div>
            )}

            <form onSubmit={handleUpdatePassword} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-300">Senha Atual</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all shadow-inner"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-300">Nova Senha</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all shadow-inner"
                />
              </div>

              <button
                type="submit"
                disabled={loadingPass}
                className="w-full mt-2 flex items-center justify-center px-4 py-3 bg-white/10 hover:bg-white/20 disabled:bg-white/5 text-white font-semibold rounded-xl transition-all border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
              >
                {loadingPass ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Atualizar Senha"
                )}
              </button>
            </form>
          </div>

          {/* Redes Sociais */}
          <div className="bg-gradient-to-br from-rose-600/10 via-black/20 to-transparent backdrop-blur-3xl border border-white/5 p-8 rounded-3xl shadow-xl relative overflow-hidden">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                <LinkIcon className="w-5 h-5 text-rose-400" />
                Redes Profissionais
              </h2>
              <p className="text-sm text-gray-400 ml-7">Conecte seus perfis para compartilhar com a comunidade.</p>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="relative">
                <Github className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="Seu usuário no GitHub"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all shadow-inner text-sm"
                />
              </div>
              <div className="relative">
                <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  value={instagramUrl}
                  onChange={(e) => setInstagramUrl(e.target.value)}
                  placeholder="Seu @ no Instagram"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all shadow-inner text-sm"
                />
              </div>
              
              <button
                type="button"
                onClick={handleUpdateProfile}
                disabled={loadingProfile}
                className="w-full mt-2 flex items-center justify-center px-4 py-3 bg-white/10 hover:bg-white/20 disabled:bg-white/5 text-white font-semibold rounded-xl transition-all border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
              >
                {loadingProfile ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Salvar Redes Sociais"
                )}
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
