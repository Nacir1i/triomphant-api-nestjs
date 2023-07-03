import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CustomerDto, PartialTypedCustomer } from './dto';
import { customer } from '@prisma/client';
import { ServiceInterface } from '../utils/interfaces';

interface DashboardStats {
  frequencies: Record<string, number>;
  total: number;
  repeating: number;
  unique: number;
}

@Injectable()
export class CustomerService
  implements ServiceInterface<CustomerDto, PartialTypedCustomer, customer>
{
  private readonly DAY_MS = 86_400_000;
  private readonly MONTH_MS = this.DAY_MS * 31;
  private readonly BI_WEEK_MS = this.DAY_MS * 14;

  constructor(private prismaService: PrismaService) {}

  async create(dto: CustomerDto): Promise<customer> {
    const customer = await this.prismaService.customer.create({
      data: {
        first_name: dto.first_name,
        last_name: dto.last_name,
        contact_information: {
          create: {
            email: dto.email,
            phone: dto.phone,
            address: dto.address,
            honorific: dto.honorific,
            emergency: dto.emergency,
          },
        },
        bank_information: {
          create: {
            name: dto.name,
            number: dto.number,
            rib: dto.rib,
            swift: dto.swift,
            ice: dto.ice,
          },
        },
      },
    });

    return customer;
  }

  async findOne(id: number): Promise<customer | null> {
    const customer = await this.prismaService.customer.findFirst({
      where: {
        AND: [
          {
            id: id,
          },
          {
            is_deleted: false,
          },
        ],
      },
      include: {
        contact_information: true,
        bank_information: true,
      },
    });

    return customer;
  }

  async findSearch(search: string): Promise<customer[] | []> {
    const customers = await this.prismaService.customer.findMany({
      where: {
        OR: [
          {
            first_name: {
              contains: search,
            },
          },
          {
            last_name: {
              contains: search,
            },
          },
          {
            contact_information: {
              email: {
                contains: search,
              },
            },
          },
          {
            contact_information: {
              phone: {
                contains: search,
              },
              email: {
                contains: search,
              },
            },
          },
        ],
        AND: {
          is_deleted: false,
        },
      },
      include: {
        contact_information: true,
        bank_information: true,
      },
    });

    return customers;
  }

  async findAll(): Promise<customer[] | []> {
    return await this.prismaService.customer.findMany({
      where: {
        is_deleted: false,
      },
      include: {
        contact_information: true,
        bank_information: true,
      },
    });
  }

  async getPage(page: number, limit: number): Promise<object> {
    const startIndex = (page - 1) * limit;

    const customers = await this.prismaService.customer.findMany({
      skip: startIndex,
      take: limit,
      where: {
        is_deleted: false,
      },
      include: {
        contact_information: true,
        bank_information: true,
      },
    });

    const findAll = (await this.findAll()).length;

    const pagesCount = findAll <= limit ? 1 : Math.ceil(findAll / limit);
    const remainingPages = pagesCount - page >= 0 ? pagesCount - page : 0;

    return { customers, pagesCount, remainingPages };
  }

  async getDashboardStats(
    date_minimum: number,
    date_origin: number,
  ): Promise<DashboardStats> {
    const customers = await this.prismaService.customer.findMany({
      where: { is_deleted: false, created_at: { gte: new Date(date_minimum) } },
      include: { orders: true },
    });

    const frequencies = new Map();
    for (let frequency_index = 0; frequency_index < 14; frequency_index++) {
      const date_object = new Date(date_origin - this.DAY_MS * frequency_index);
      const month = (date_object.getMonth() + 1).toFixed(0).padStart(2, '0');
      const day_of_month = date_object.getDate().toFixed(0).padStart(2, '0');
      const frequency_key = `${month}/${day_of_month}`;
      frequencies.set(frequency_key, 0);
    }

    let [counter_customers_repeating, counter_customers_unique] = [0, 0];
    customers.forEach((customer) => {
      const date_object = new Date(customer.created_at);
      const month = (date_object.getMonth() + 1).toFixed(0).padStart(2, '0');
      const day_of_month = date_object.getDate().toFixed(0).padStart(2, '0');
      const frequency_key = `${month}/${day_of_month}`;

      const old_frequency = frequencies.get(frequency_key) ?? 0;
      frequencies.set(frequency_key, old_frequency + 1);
      // ---
      if (customer.orders.length > 1) counter_customers_repeating += 1;
      else counter_customers_unique += 1;
    });
    return {
      frequencies: Object.fromEntries(frequencies),
      repeating: counter_customers_repeating,
      unique: counter_customers_unique,
      total: customers.length,
    };
  }

  async update(
    id: number,
    dto: PartialTypedCustomer,
  ): Promise<customer | null> {
    return await this.prismaService.customer.update({
      where: {
        id: id,
      },
      data: {
        first_name: dto.first_name,
        last_name: dto.last_name,
        contact_information: {
          update: {
            email: dto.email,
            phone: dto.phone,
            address: dto.address,
            honorific: dto.honorific,
            emergency: dto.emergency,
          },
        },
        bank_information: {
          upsert: {
            create: {
              name: dto.name,
              number: dto.number,
              rib: dto.rib,
              swift: dto.swift,
              ice: dto.ice,
            },
            update: {
              name: dto.name,
              number: dto.number,
              rib: dto.rib,
              swift: dto.swift,
              ice: dto.ice,
            },
          },
        },
      },
      include: {
        contact_information: true,
        bank_information: true,
      },
    });
  }

  async delete(id: number) {
    return await this.prismaService.customer.update({
      where: {
        id: id,
      },
      data: {
        is_deleted: true,
      },
    });
  }
}
