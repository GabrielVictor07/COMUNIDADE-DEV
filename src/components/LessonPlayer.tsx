"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle, Circle, ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";

function getEmbedUrl(url: string) {
  if (!url) return "";
  
  try {
    // YouTube
    const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([^"&?\/\s]{11})/);
    if (ytMatch && ytMatch[1]) {
      return `https://www.youtube.com/embed/${ytMatch[1]}`;
    }

    // Vimeo
    const vimeoMatch = url.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/);
    if (vimeoMatch && vimeoMatch[3]) {
      return `https://player.vimeo.com/video/${vimeoMatch[3]}`;
    }
  } catch (e) {
    console.error("Error parsing video URL", e);
  }
  
  return url;
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  video_url: string;
}

interface CourseLesson {
  id: string;
  title: string;
  order: number;
  completed: boolean;
}

interface LessonPlayerProps {
  lesson: Lesson;
  courseLessons: CourseLesson[];
  courseId: string;
  currentProgress: number;
}

export default function LessonPlayer({
  lesson,
  courseLessons,
  currentProgress,
}: LessonPlayerProps) {
  const [completed, setCompleted] = useState(
    courseLessons.find((l) => l.id === lesson.id)?.completed ?? false
  );

  const currentIndex = courseLessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? courseLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < courseLessons.length - 1
      ? courseLessons[currentIndex + 1]
      : null;

  const isEmbeddable =
    lesson.video_url.includes("youtube") ||
    lesson.video_url.includes("youtu.be") ||
    lesson.video_url.includes("vimeo");

  const markComplete = async () => {
    setCompleted(true);
    await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lessonId: lesson.id,
        progress: 100,
        completed: true,
      }),
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 animate-in fade-in duration-500">
      <div className="flex-1">
        <Link
          href={`/aulas`}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-purple-400 text-sm font-medium transition-colors mb-6 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/5"
        >
          <LayoutGrid className="w-4 h-4" />
          Voltar para o Catálogo
        </Link>

        <div className="bg-black/60 rounded-2xl overflow-hidden aspect-video mb-6 border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
          {isEmbeddable ? (
            <iframe
              src={getEmbedUrl(lesson.video_url)}
              className="w-full h-full"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          ) : (
            <video
              src={lesson.video_url}
              controls
              className="w-full h-full"
            />
          )}
        </div>

        <h1 className="text-3xl font-bold text-white mb-3">{lesson.title}</h1>
        {lesson.description && (
          <p className="text-gray-400 mb-6 text-lg leading-relaxed">{lesson.description}</p>
        )}

        <div className="flex items-center gap-4 py-6 border-y border-white/10">
          {!completed && (
            <button
              onClick={markComplete}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium py-2.5 px-6 rounded-xl transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)]"
            >
              Marcar como concluída
            </button>
          )}
          {completed && (
            <span className="flex items-center gap-2 text-green-400 font-medium bg-green-500/10 px-4 py-2 rounded-xl border border-green-500/20">
              <CheckCircle className="w-5 h-5" />
              Aula concluída
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mt-8">
          {prevLesson ? (
            <Link
              href={`/aulas/${prevLesson.id}`}
              className="flex items-center gap-3 text-gray-400 hover:text-white transition group bg-white/5 hover:bg-white/10 px-5 py-3 rounded-xl border border-white/5"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Anterior</span>
                <span className="text-sm font-medium">{prevLesson.title}</span>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {nextLesson ? (
            <Link
              href={`/aulas/${nextLesson.id}`}
              className="flex items-center gap-3 text-gray-400 hover:text-white transition group bg-white/5 hover:bg-white/10 px-5 py-3 rounded-xl border border-white/5 text-right"
            >
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Próxima</span>
                <span className="text-sm font-medium">{nextLesson.title}</span>
              </div>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>

      <aside className="lg:w-96 flex-shrink-0">
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-5 sticky top-24 shadow-2xl">
          <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
            <LayoutGrid className="w-5 h-5 text-purple-400" />
            Catálogo de Aulas
          </h2>
          <div className="flex flex-col gap-2 max-h-[calc(100vh-200px)] overflow-y-auto pr-2 custom-scrollbar">
            {courseLessons.map((l) => {
              const isActive = l.id === lesson.id;
              return (
                <Link
                  key={l.id}
                  href={`/aulas/${l.id}`}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all border ${
                    isActive
                      ? "bg-purple-500/10 text-purple-300 border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.1)]"
                      : "bg-white/5 text-gray-400 border-transparent hover:text-white hover:bg-white/10"
                  }`}
                >
                  {l.completed ? (
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  ) : isActive ? (
                    <div className="w-5 h-5 rounded-full border-2 border-purple-400 flex-shrink-0 relative">
                      <div className="absolute inset-[3px] rounded-full bg-purple-400" />
                    </div>
                  ) : (
                    <Circle className="w-5 h-5 text-white/20 flex-shrink-0" />
                  )}
                  <span className="truncate font-medium flex-1">
                    {l.title}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </aside>
    </div>
  );
}
