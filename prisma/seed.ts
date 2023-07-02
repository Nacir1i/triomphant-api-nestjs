import * as argon from 'argon2';
import { PrismaClient } from '@prisma/client';
import * as seedData from './data';
const prisma = new PrismaClient();

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
  await prisma.user.create({
    data: {
      role: {
        connect: {
          id: 1,
        },
      },
      salary: 0,
      first_name: 'Developer',
      last_name: 'Account',
      username: 'developer',
      password: await argon.hash('**developer**2017**'),
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
  });
  await prisma.contact_information.createMany({
    data: seedData.contactInfo,
  });
  await prisma.bank_information.createMany({
    data: seedData.backInfo,
  });
  await prisma.location.createMany({
    data: seedData.locations,
  });
  await prisma.inventory_category.createMany({
    data: seedData.inventoryCategory,
  });
  await prisma.invoice_category.createMany({
    data: seedData.invoiceCategory,
  });
  await prisma.user.createMany({
    data: seedData.users,
  });
  await prisma.vendor.createMany({
    data: seedData.vendors,
  });
  await prisma.customer.createMany({
    data: seedData.customers,
  });
  await prisma.product.createMany({
    data: seedData.products,
  });
  await prisma.service.createMany({
    data: seedData.services,
  });
  await prisma.material.createMany({
    data: seedData.materials,
  });
  await prisma.charge.createMany({
    data: seedData.charges,
  });
  for (let index = 0; index < seedData.packages.length; index++) {
    await prisma.renamedpackage.create({
      data: seedData.packages[index],
    });
  }
  for (let index = 0; index < seedData.quotes.length; index++) {
    await prisma.quote.create({
      data: seedData.quotes[index],
    });
  }
  for (let index = 0; index < seedData.orders.length; index++) {
    await prisma.order.create({
      data: seedData.orders[index],
    });
  }
  for (let index = 0; index < seedData.deliveryInvoices.length; index++) {
    await prisma.delivery_invoice.create({
      data: seedData.deliveryInvoices[index],
    });
  }
  for (let index = 0; index < seedData.taxedInvoices.length; index++) {
    await prisma.taxed_invoice.create({
      data: seedData.taxedInvoices[index],
    });
  }
  for (let index = 0; index < seedData.appointments.length; index++) {
    await prisma.appointment.create({
      data: seedData.appointments[index],
    });
  }
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
