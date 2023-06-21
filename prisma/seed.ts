import * as argon from 'argon2';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// const genHash = async (string: string) => {
//   const salt: string = await argon.genSalt();
//   const hash: string = await argon.hash(string, salt);

//   return hash;
// };

async function main() {
  const roles = [
    'Developpeur',
    'Propriétaire',
    'Assistant',
    'Agent de provisionnement',
  ];
  await prisma.role.createMany({
    data: roles.map((title) => ({ title })),
  });
  const user = await prisma.user.upsert({
    where: {
      id: 1,
    },
    create: {
      role: {
        connect: {
          id: 1,
        },
      },
      salary: 0,
      first_name: 'Developer',
      last_name: 'Account',
      username: 'developer',
      password: await argon.hash('developer_2023'),
      image_url: '',
      birth_date: new Date().toISOString(),
      status: 1,
      contact_information: {
        create: {
          email: 'admin@user.test',
          phone: '06 66 66 66 66',
          address: 'test address, 420',
          honorific: 'Mister',
          emergency: false,
        },
      },
      bank_information: {
        create: {
          name: '____',
          number: '____ ____ ____ ____',
          rib: '___ ___ ___ ___ ___',
          swift: '_________',
          ice: '_________',
        },
      },
    },
    update: {},
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
