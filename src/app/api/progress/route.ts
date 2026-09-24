import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/permissions";
import { updateProgress } from "@/server/progress";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const body = await request.json();
  const { lessonId, progress, completed } = body;

  if (!lessonId || typeof progress !== "number" || typeof completed !== "boolean") {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }

  await updateProgress(user.id, lessonId, progress, completed);

  return NextResponse.json({ success: true });
}
