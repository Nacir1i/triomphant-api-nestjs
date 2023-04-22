import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CustomerDto, PartialTypedCustomer } from './dto';
import { customer } from '@prisma/client';

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

  async findAll() {
    return await this.prismaService.customer.findMany({
      include: {
        contact_information: true,
        bank_information: true,
      },
    });
  }
}
