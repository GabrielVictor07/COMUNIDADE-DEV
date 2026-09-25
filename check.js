const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const lessons = await prisma.lesson.findMany({
    orderBy: { created_at: "desc" },
    take: 5
  });
  console.log(JSON.stringify(lessons, null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
