const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function check() {
  const users = await prisma.user.findMany();
  console.log("Users in DB:", users.map(u => ({ email: u.email, role: u.role, pass: u.password_hash })));
  
  if (users.length > 0) {
    const admin = users.find(u => u.email === 'admin@comunidadedev.com');
    if (admin) {
        console.log("Found admin, testing password 'admin123'");
        const valid = await bcrypt.compare('admin123', admin.password_hash);
        console.log("Password valid?:", valid);
    }
  }
}
check().finally(() => prisma.$disconnect());
