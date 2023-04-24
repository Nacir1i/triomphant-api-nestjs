import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CustomerDto, PartialTypedCustomer } from './dto';
import { customer, Prisma } from '@prisma/client';

@Injectable()
export class CustomerService {
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

  async findOne(dto: PartialTypedCustomer): Promise<customer | null> {
    const customer = await this.prismaService.customer.findFirst({
      where: {
        OR: [
          {
            id: dto.id,
          },
          {
            first_name: {
              contains: dto.firstName,
            },
          },
          {
            last_name: {
              contains: dto.lastName,
            },
          },
          {
            contact_information: {
              email: {
                contains: dto.email,
              },
            },
          },
          {
            contact_information: {
              phone: {
                contains: dto.phone,
              },
            },
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

  async findAll(): Promise<customer[] | []> {
    return await this.prismaService.customer.findMany({
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
    try {
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
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new NotFoundException(error.meta?.cause);
      }

      throw error;
    }
  }

  async delete(id: number) {
    try {
      return await this.prismaService.customer.update({
        where: {
          id: id,
        },
        data: {
          is_deleted: true,
        },
      });
    } catch (error) {
      // TODO: add a better dynamic error handling (db connection error is instance of PrismaClientInitializationError)
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(error.meta?.cause);
        }
      }
      throw error;
    }
  }
}
