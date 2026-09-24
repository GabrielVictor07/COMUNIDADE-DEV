import { prisma } from "@/lib/prisma";

// Sempre teremos apenas 1 linha de settings (singleton)
export async function getSettings() {
  let settings = await prisma.platformSettings.findFirst();

  if (!settings) {
    settings = await prisma.platformSettings.create({
      data: {
        platformName: "Comunidade Dev",
        supportEmail: "",
        tiktokUrl: "https://tiktok.com/@seu_perfil",
        instagramUrl: "https://instagram.com/seu_perfil",
        asaasKey: "",
        is_maintenance: false,
      },
    });
  }

  return settings;
}

export async function updateSettings(data: {
  platformName?: string;
  supportEmail?: string;
  tiktokUrl?: string;
  instagramUrl?: string;
  asaasKey?: string;
  is_maintenance?: boolean;
}) {
  const currentSettings = await getSettings();

  return prisma.platformSettings.update({
    where: { id: currentSettings.id },
    data,
  });
}
