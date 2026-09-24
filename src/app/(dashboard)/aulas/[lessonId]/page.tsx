import { requireActiveAccess } from "@/lib/permissions";
import { getLessonById, getLessons } from "@/server/lessons";
import { getUserAllProgress } from "@/server/progress";
import { redirect } from "next/navigation";
import LessonPlayer from "@/components/LessonPlayer";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const user = await requireActiveAccess();
  const { lessonId } = await params;
  const lesson = await getLessonById(lessonId);

  if (!lesson) redirect(`/aulas`);

  const allLessons = await getLessons();
  const progress = await getUserAllProgress(user.id);
  const progressMap = new Map(
    progress.map((p) => [p.lesson_id, p])
  );

  const currentProgress = progressMap.get(lessonId)?.progress ?? 0;

  const lessonsForSidebar = allLessons.map((l) => ({
    id: l.id,
    title: l.title,
    order: 0,
    completed: progressMap.get(l.id)?.completed ?? false,
  }));

  return (
    <LessonPlayer
      lesson={{
        id: lesson.id,
        title: lesson.title,
        description: "",
        video_url: lesson.video_url,
      }}
      courseLessons={lessonsForSidebar}
      courseId="standalone"
      currentProgress={currentProgress}
    />
  );
}
