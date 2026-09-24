import { NextResponse } from "next/server";
import { getSettings, updateSettings } from "@/server/settings";
import { getCurrentUser } from "@/lib/permissions";

export async function GET() {
  try {
    const settings = await getSettings();
    return NextResponse.json(settings);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const data = await request.json();
    const updated = await updateSettings({
      platformName: data.platformName,
      supportEmail: data.supportEmail,
      tiktokUrl: data.tiktokUrl,
      instagramUrl: data.instagramUrl,
      asaasKey: data.asaasKey,
      is_maintenance: data.is_maintenance,
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
