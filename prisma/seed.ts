import { PrismaClient } from '@prisma/client';
import * as argon from 'argon2';

const prisma = new PrismaClient();

async function main() {
  const hash: string = await argon.hash('admin');
  const user = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      first_name: 'user',
      last_name: 'user',
      username: 'admin',
      password: hash,
      role: {
        create: {
          title: 'ADMIN',
        },
      },
      salary: 69420,
      contact_information: {
        create: {
          email: 'lol.randomxd@lmao.sheesh',
          phone: '0666666666',
        },
      },
    },
  });

  const customer = await prisma.customer.create({
    data: {
      first_name: 'customer',
      last_name: 'customer',
      contact_information: {
        create: {
          email: 'customer.email@golang.per',
          phone: '06666666',
        },
      },
    },
  });

  console.log({ user, customer });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
