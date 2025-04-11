import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('w3b5t0r32025!@', 10);

  const adminRole = await prisma.role.upsert({
    where: { name: 'admin' },
    update: {},
    create: {
      name: 'admin',
      label: 'Administrator',
    },
  });
  
  const userRole = await prisma.role.upsert({
    where: { name: 'user' },
    update: {},
    create: {
      name: 'user',
      label: 'User',
    },
  });
  

  await prisma.user.upsert({
    where: { email: 'admin@webstore.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@webstore.com',
      password: hashedPassword,
      roleId: adminRole.id,
    },
  });

  await prisma.user.upsert({
    where: { email: 'user@webstore.com' },
    update: {},
    create: {
      name: 'Default User',
      email: 'user@webstore.com',
      password: hashedPassword,
      roleId: userRole.id,
    },
  });

  console.log('✅ Seed complete: Admin and default user created');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
