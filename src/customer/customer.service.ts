import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CustomerDto, PartialTypedCustomer } from './dto';
import { customer } from '@prisma/client';
import { ServiceInterface } from '../utils/interfaces';

@Injectable()
export class CustomerService
  implements ServiceInterface<CustomerDto, PartialTypedCustomer, customer>
{
  constructor(private prismaService: PrismaService) {}

  async create(dto: CustomerDto): Promise<customer> {
    const customer = await this.prismaService.customer.create({
      data: {
        first_name: dto.firstName,
        last_name: dto.lastName,
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

  async update(
    id: number,
    dto: PartialTypedCustomer,
  ): Promise<customer | null> {
    return await this.prismaService.customer.update({
      where: {
        id: id,
      },
      data: {
        first_name: dto.firstName,
        last_name: dto.lastName,
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
