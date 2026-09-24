"use client";

import { useState } from "react";
import Button from "./Button";
import { createComment } from "@/server/community";

export default function CommentForm({ postId }: { postId: string }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);
    try {
      await createComment({ postId, content });
      setContent("");
    } catch (err) {
      alert("Erro ao enviar comentário");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-6">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Escreva uma resposta..."
        rows={3}
        className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-y w-full"
        required
      />
      <div className="flex justify-end">
        <Button type="submit" loading={loading}>
          Comentar
        </Button>
      </div>
    </form>
  );
}
