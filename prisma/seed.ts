import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { username: 'adminTest' },
    update: {},
    create: {
      first_name: 'user1',
      last_name: 'user1',
      username: 'adminTest',
      password: 'adminTest',
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
      first_name: 'customer1',
      last_name: 'customer1',
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
