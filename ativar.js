const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function activate() {
  const user = await prisma.user.findFirst({ orderBy: { created_at: 'desc' } });
  if (user) {
    await prisma.user.update({
      where: { id: user.id },
      data: { access_status: 'ACTIVE' }
    });
    console.log('Usuário ' + user.email + ' ativado com sucesso!');
  } else {
    console.log('Nenhum usuário encontrado.');
  }
}

activate().then(() => prisma.$disconnect()).catch(console.error);
