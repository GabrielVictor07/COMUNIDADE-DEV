"use client";

import { useState } from "react";
import { CheckCircle, UploadCloud } from "lucide-react";

interface FileUploadProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  accept?: string;
  endpoint?: "imageUploader" | "pdfUploader"; // Kept for compatibility if needed
}

export default function FileUpload({ label, value, onChange, accept = "image/*" }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Falha no upload");
      }

      const data = await res.json();
      if (data.url) {
        onChange(data.url);
      }
    } catch (error) {
      alert("Erro ao fazer upload da imagem. Verifique o console.");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="text-sm font-medium text-gray-300">{label}</label>}

      <div className="w-full relative mt-1">
        {value ? (
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-green-500/50 bg-green-500/5 rounded-xl p-6">
            <CheckCircle className="w-8 h-8 mb-2 text-green-500" />
            <span className="text-sm font-medium text-green-400 text-center break-all px-2 line-clamp-1" title={value}>
              Arquivo salvo! ({value.split("/").pop()})
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onChange("");
              }}
              className="text-xs text-red-400 hover:text-red-300 mt-3 z-10 relative bg-red-400/10 px-3 py-1.5 rounded-lg transition-colors"
            >
              Remover / Trocar
            </button>
          </div>
        ) : (
          <div className="relative group">
            <input
              type="file"
              accept={accept}
              onChange={handleFileChange}
              disabled={uploading}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
            />
            <div className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 transition-colors ${uploading ? 'border-rose-500/50 bg-rose-500/5' : 'border-white/20 bg-white/5 group-hover:border-rose-500/50 group-hover:bg-white/10'}`}>
              {uploading ? (
                <>
                  <div className="w-8 h-8 border-2 border-rose-500/30 border-t-rose-500 rounded-full animate-spin mb-3" />
                  <span className="text-sm font-medium text-rose-400">Enviando arquivo...</span>
                </>
              ) : (
                <>
                  <UploadCloud className="w-10 h-10 mb-3 text-white/40 group-hover:text-rose-400 transition-colors" />
                  <span className="text-sm font-medium text-white/60 group-hover:text-white transition-colors">
                    Clique ou arraste um arquivo para cá
                  </span>
                  <span className="text-xs text-white/30 mt-1">
                    Tamanho máximo: 4MB
                  </span>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
