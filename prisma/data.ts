import { faker } from '@faker-js/faker';
import { charge_state, charge_type, frequency } from '@prisma/client';

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomContact() {
  return {
    email: faker.internet.email(),
    phone: faker.phone.number('06 ## ## ## ##'),
    address: faker.location.streetAddress(true),
    honorific: 'attack helicopter',
    emergency: false,
  };
}

function createRandomBank() {
  return {
    name: faker.finance.accountName(),
    ice: faker.string.uuid(),
    number: faker.finance.accountNumber(),
    rib: faker.string.uuid(),
    swift: faker.string.uuid(),
  };
}

function createRandomVendor() {
  return {
    company_name: faker.company.name(),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    created_at: faker.date.recent(),
    contact_information_id: faker.number.int({ min: 1, max: 20 }),
    bank_information_id: faker.number.int({ min: 1, max: 20 }),
    is_deleted: false,
  };
}

function createRandomCustomer() {
  return {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    created_at: faker.date.recent(),
    contact_information_id: faker.number.int({ min: 1, max: 20 }),
    bank_information_id: faker.number.int({ min: 1, max: 20 }),
    is_deleted: false,
  };
}

function createRandomUser() {
  return {
    username: faker.internet.userName(),
    password:
      '$argon2i$v=19$m=16,t=2,p=1$NUd4TmZLSXlkS25YMDBLeFRnMWo$E9h+nscP9lKBgPW4EeM54A', //password is: .
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    image_url: faker.internet.url(),
    created_at: faker.date.recent(),
    recruited_at: faker.date.recent(),
    birth_date: faker.date.recent(),
    salary: faker.number.int({ min: 3000, max: 10000 }),
    status: faker.number.int({ min: 1, max: 5 }),
    role_id: faker.number.int({ min: 1, max: 4 }),
    contact_information_id: faker.number.int({ min: 1, max: 20 }),
    bank_information_id: faker.number.int({ min: 1, max: 20 }),
    is_deleted: false,
  };
}

function createRandomLocation() {
  return {
    title: faker.location.street(),
    address: faker.location.streetAddress(true),
  };
}

function createRandomInventoryCategory() {
  return {
    title: faker.commerce.department(),
  };
}

function createRandomInvoiceCategory() {
  return {
    title: faker.commerce.department(),
  };
}

function createRandomProduct() {
  return {
    cost: Number(faker.commerce.price({ min: 50, max: 100 })),
    price: Number(faker.commerce.price({ min: 50, max: 100 })),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    barcode: faker.string.nanoid(),
    sku: faker.string.nanoid(),
    quantity: faker.number.int({ min: 1, max: 150 }),
    quantity_threshold: faker.number.int({ min: 20, max: 70 }),
    location_id: faker.number.int({ min: 1, max: 5 }),
    category_id: faker.number.int({ min: 1, max: 10 }),
    vendor_invoice_id: faker.number.int({ min: 1, max: 4 }),
  };
}

function createRandomMaterial() {
  return {
    sku: faker.string.nanoid(),
    price: Number(faker.commerce.price({ min: 50, max: 100 })),
    title: faker.commerce.productName(),
    category_id: faker.number.int({ min: 1, max: 10 }),
    description: faker.commerce.productDescription(),
    quantity: faker.number.int({ min: 1, max: 150 }),
    quantity_threshold: faker.number.int({ min: 20, max: 70 }),
    location_id: faker.number.int({ min: 1, max: 5 }),
  };
}

function createRandomService() {
  return {
    cost: Number(faker.commerce.price({ min: 50, max: 100 })),
    price: Number(faker.commerce.price({ min: 50, max: 100 })),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    category_id: faker.number.int({ min: 1, max: 10 }),
  };
}

function createRandomPackage() {
  const manualContent = Array(getRandomNumber(0, 10))
    .fill(null)
    .map(() => ({
      cost: Number(faker.commerce.price({ min: 50, max: 100 })),
      price: Number(faker.commerce.price({ min: 50, max: 100 })),
      title: faker.commerce.productName(),
      quantity: Number(faker.commerce.price({ min: 50, max: 100 })),
    }));
  const products = Array(getRandomNumber(0, 10))
    .fill(null)
    .map(() => ({
      cost: Number(faker.commerce.price({ min: 50, max: 100 })),
      price: Number(faker.commerce.price({ min: 50, max: 100 })),
      quantity: Number(faker.commerce.price({ min: 50, max: 100 })),
      product: {
        create: createRandomProduct(),
      },
    }));
  const services = Array(getRandomNumber(0, 10))
    .fill(null)
    .map(() => ({
      cost: Number(faker.commerce.price({ min: 50, max: 100 })),
      price: Number(faker.commerce.price({ min: 50, max: 100 })),
      service: {
        create: createRandomService(),
      },
    }));

  return {
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    category: {
      connect: {
        id: faker.number.int({ min: 1, max: 10 }),
      },
    },
    price: Number(faker.commerce.price({ min: 50, max: 100 })),

    manual_content: {
      create: manualContent,
    },
    products: {
      create: products,
    },
    services: {
      create: services,
    },
  };
}

function createRandomQuote() {
  const manualContent = Array(getRandomNumber(0, 10))
    .fill(null)
    .map(() => ({
      cost: Number(faker.commerce.price({ min: 50, max: 100 })),
      price: Number(faker.commerce.price({ min: 50, max: 100 })),
      title: faker.commerce.productName(),
      quantity: Number(faker.commerce.price({ min: 50, max: 100 })),
    }));
  const products = Array(getRandomNumber(0, 10))
    .fill(null)
    .map(() => ({
      cost: Number(faker.commerce.price({ min: 50, max: 100 })),
      price: Number(faker.commerce.price({ min: 50, max: 100 })),
      quantity: Number(faker.commerce.price({ min: 50, max: 100 })),
      product: {
        create: createRandomProduct(),
      },
    }));
  const services = Array(getRandomNumber(0, 10))
    .fill(null)
    .map(() => ({
      cost: Number(faker.commerce.price({ min: 50, max: 100 })),
      price: Number(faker.commerce.price({ min: 50, max: 100 })),
      service: {
        create: createRandomService(),
      },
    }));

  return {
    ref: faker.string.uuid(),
    price: Number(faker.commerce.price({ min: 50, max: 100 })),
    title: faker.commerce.productName(),
    note: faker.commerce.productDescription(),
    due_date: faker.date.future(),
    address: faker.location.streetAddress(true),
    status: 1,

    customer: {
      connect: {
        id: faker.number.int({ min: 1, max: 4 }),
      },
    },
    category: {
      connect: {
        id: faker.number.int({ min: 1, max: 10 }),
      },
    },

    cost_modifier: {
      create: {
        shipping: Number(faker.commerce.price({ min: 10, max: 150 })),
        discount: Number(faker.commerce.price({ min: 10, max: 150 })),
        tax: Number(faker.commerce.price({ min: 10, max: 20 })),
        is_discount_percentage: faker.datatype.boolean(),
      },
    },
    manual_content: {
      create: manualContent,
    },
    products: {
      create: products,
    },
    services: {
      create: services,
    },
  };
}

function createRandomOrder() {
  const manualContent = Array(getRandomNumber(0, 10))
    .fill(null)
    .map(() => ({
      cost: Number(faker.commerce.price({ min: 50, max: 100 })),
      price: Number(faker.commerce.price({ min: 50, max: 100 })),
      title: faker.commerce.productName(),
      quantity: Number(faker.commerce.price({ min: 50, max: 100 })),
    }));
  const products = Array(getRandomNumber(0, 10))
    .fill(null)
    .map(() => ({
      cost: Number(faker.commerce.price({ min: 50, max: 100 })),
      price: Number(faker.commerce.price({ min: 50, max: 100 })),
      quantity: Number(faker.commerce.price({ min: 50, max: 100 })),
      product: {
        create: createRandomProduct(),
      },
    }));
  const services = Array(getRandomNumber(0, 10))
    .fill(null)
    .map(() => ({
      cost: Number(faker.commerce.price({ min: 50, max: 100 })),
      price: Number(faker.commerce.price({ min: 50, max: 100 })),
      service: {
        create: createRandomService(),
      },
    }));

  return {
    ref: faker.string.uuid(),
    title: faker.commerce.productName(),
    paid: Number(faker.commerce.price({ min: 50, max: 100 })),
    price: Number(faker.commerce.price({ min: 1000, max: 10000 })),
    note: faker.commerce.productDescription(),
    delivery_address: faker.location.streetAddress(true),
    due_date: faker.date.future(),
    status: 1,

    customer: {
      connect: {
        id: faker.number.int({ min: 1, max: 4 }),
      },
    },
    category: {
      connect: {
        id: faker.number.int({ min: 1, max: 10 }),
      },
    },
    quote: {
      connect: {
        id: faker.number.int({ min: 1, max: 5 }),
      },
    },

    cost_modifier: {
      create: {
        shipping: Number(faker.commerce.price({ min: 10, max: 150 })),
        discount: Number(faker.commerce.price({ min: 10, max: 150 })),
        tax: Number(faker.commerce.price({ min: 10, max: 20 })),
        is_discount_percentage: faker.datatype.boolean(),
      },
    },
    manual_content: {
      create: manualContent,
    },
    products: {
      create: products,
    },
    services: {
      create: services,
    },
  };
}

function createRandomTaxedInvoice() {
  const manualContent = Array(getRandomNumber(0, 10))
    .fill(null)
    .map(() => ({
      cost: Number(faker.commerce.price({ min: 50, max: 100 })),
      price: Number(faker.commerce.price({ min: 50, max: 100 })),
      title: faker.commerce.productName(),
      quantity: Number(faker.commerce.price({ min: 50, max: 100 })),
    }));
  const products = Array(getRandomNumber(0, 10))
    .fill(null)
    .map(() => ({
      cost: Number(faker.commerce.price({ min: 50, max: 100 })),
      price: Number(faker.commerce.price({ min: 50, max: 100 })),
      quantity: Number(faker.commerce.price({ min: 50, max: 100 })),
      product: {
        create: createRandomProduct(),
      },
    }));
  const services = Array(getRandomNumber(0, 10))
    .fill(null)
    .map(() => ({
      cost: Number(faker.commerce.price({ min: 50, max: 100 })),
      price: Number(faker.commerce.price({ min: 50, max: 100 })),
      service: {
        create: createRandomService(),
      },
    }));

  return {
    ref: faker.string.uuid(),
    note: faker.commerce.productDescription(),
    title: faker.commerce.productName(),
    delivery_address: faker.location.streetAddress(true),
    paid: Number(faker.commerce.price({ min: 50, max: 100 })),
    price: Number(faker.commerce.price({ min: 50, max: 100 })),
    status: 1,
    due_date: faker.date.future(),

    customer: {
      connect: {
        id: faker.number.int({ min: 1, max: 4 }),
      },
    },
    category: {
      connect: {
        id: faker.number.int({ min: 1, max: 10 }),
      },
    },
    delivery_invoice: {
      connect: {
        id: faker.number.int({ min: 1, max: 5 }),
      },
    },

    cost_modifier: {
      create: {
        shipping: Number(faker.commerce.price({ min: 10, max: 150 })),
        discount: Number(faker.commerce.price({ min: 10, max: 150 })),
        tax: Number(faker.commerce.price({ min: 10, max: 20 })),
        is_discount_percentage: faker.datatype.boolean(),
      },
    },
    manual_content: {
      create: manualContent,
    },
    products: {
      create: products,
    },
    services: {
      create: services,
    },
  };
}

function createRandomDeliveryInvoice(index: number) {
  const manualContent = Array(getRandomNumber(0, 10))
    .fill(null)
    .map(() => ({
      cost: Number(faker.commerce.price({ min: 50, max: 100 })),
      price: Number(faker.commerce.price({ min: 50, max: 100 })),
      title: faker.commerce.productName(),
      quantity: Number(faker.commerce.price({ min: 50, max: 100 })),
    }));
  const materials = Array(getRandomNumber(0, 10))
    .fill(null)
    .map(() => ({
      remaining: faker.number.int({ min: 0, max: 10 }),
      quantity: faker.number.int({ min: 10, max: 90 }),
      material: {
        create: createRandomMaterial(),
      },
    }));

  return {
    title: faker.commerce.productName(),
    note: faker.commerce.productDescription(),
    status: 1,

    orders: {
      connect: {
        id: index,
      },
    },

    manual_content: {
      create: manualContent,
    },
    materials: {
      create: materials,
    },
    employees: {
      create: [
        {
          user_id: 3,
        },
        {
          user_id: 4,
        },
      ],
    },
  };
}

function createRandomAppointment() {
  return {
    status: 1,
    title: faker.commerce.productName(),
    due_date: faker.date.future({
      years: 1,
      refDate: new Date().toISOString(),
    }),

    category: {
      connect: {
        id: faker.number.int({ min: 1, max: 10 }),
      },
    },
    order: {
      connect: {
        id: faker.number.int({ min: 1, max: 5 }),
      },
    },
  };
}

function createRandomCharge() {
  return {
    ref: faker.string.uuid(),
    price: Number(faker.commerce.price({ min: 50, max: 100 })),
    title: faker.commerce.productName(),
    type: faker.helpers.enumValue(charge_type),
    state: faker.helpers.enumValue(charge_state),
    frequency: faker.helpers.enumValue(frequency),
  };
}

export const backInfo = faker.helpers.multiple(createRandomBank, {
  count: 20,
});
export const contactInfo = faker.helpers.multiple(createRandomContact, {
  count: 20,
});
export const users = faker.helpers.multiple(createRandomUser, {
  count: 4,
});
export const vendors = faker.helpers.multiple(createRandomVendor, {
  count: 4,
});
export const customers = faker.helpers.multiple(createRandomCustomer, {
  count: 4,
});
export const locations = faker.helpers.multiple(createRandomLocation, {
  count: 5,
});
export const inventoryCategory = faker.helpers.multiple(
  createRandomInventoryCategory,
  {
    count: 10,
  },
);
export const invoiceCategory = faker.helpers.multiple(
  createRandomInvoiceCategory,
  {
    count: 10,
  },
);
export const products = faker.helpers.multiple(createRandomProduct, {
  count: 10,
});
export const services = faker.helpers.multiple(createRandomService, {
  count: 10,
});
export const materials = faker.helpers.multiple(createRandomMaterial, {
  count: 15,
});
export const packages = faker.helpers.multiple(createRandomPackage, {
  count: 4,
});
export const quotes = faker.helpers.multiple(createRandomQuote, {
  count: 5,
});
export const orders = faker.helpers.multiple(createRandomOrder, {
  count: 5,
});
export const taxedInvoices = faker.helpers.multiple(createRandomTaxedInvoice, {
  count: 5,
});
export const appointments = faker.helpers.multiple(createRandomAppointment, {
  count: 5,
});
export const charges = faker.helpers.multiple(createRandomCharge, {
  count: 20,
});
export const deliveryInvoices = Array(5)
  .fill(null)
  .map((_, index) => createRandomDeliveryInvoice(index + 1));
