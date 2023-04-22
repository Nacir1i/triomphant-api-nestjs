import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CustomerDto } from './dto';
import { customer } from '@prisma/client';

@Injectable()
export class CustomerService {
  constructor(private prismaService: PrismaService) {}

  async getCustomer(dto: CustomerDto): Promise<customer | null> {
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
    });

    return customer;
  }
}
