import { requireActiveAccess } from "@/lib/permissions";
import { getLessons } from "@/server/lessons";
import AulasClient from "./AulasClient";

export default async function AulasPage() {
  await requireActiveAccess();
  const lessons = await getLessons();

  return <AulasClient initialLessons={lessons} />;
}
