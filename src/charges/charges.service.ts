import { Injectable } from '@nestjs/common';
import { ServiceInterface } from '../utils/interfaces';
import { ChargeDto, ChargePayment, UpdateChargeDto } from './dto';
import { charge, charge_state, charge_type } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChargesService
  implements ServiceInterface<ChargeDto, UpdateChargeDto, charge>
{
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: ChargeDto): Promise<charge> {
    return await this.prismaService.charge.create({
      data: {
        title: dto.title,
        price: dto.price,
        type: dto.type,
        state: dto.state,
        frequency: dto.frequency,
        vendor_id: dto.vendor_id,

        payments: {
          create: dto.payments,
        },
      },
    });
  }

  async findOne(id: number): Promise<charge> {
    return await this.prismaService.charge.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findSearch(search: string): Promise<[] | charge[]> {
    return await this.prismaService.charge.findMany({
      where: {
        OR: [
          {
            ref: {
              contains: search,
            },
          },
          {
            title: {
              contains: search,
            },
          },
        ],
      },
    });
  }

  async findByState(state: charge_state): Promise<[] | charge[]> {
    return await this.prismaService.charge.findMany({
      where: {
        state: state,
      },
    });
  }

  async findByType(type: charge_type): Promise<[] | charge[]> {
    return await this.prismaService.charge.findMany({
      where: {
        type: type,
      },
    });
  }

  async findAll(): Promise<[] | charge[]> {
    return await this.prismaService.charge.findMany();
  }

  async getPage(page: number, limit: number): Promise<object> {
    const startIndex = (page - 1) * limit;

    const charges = await this.prismaService.charge.findMany({
      skip: startIndex,
      take: limit,
    });

    const findAll = (await this.findAll()).length;

    const pagesCount = findAll <= limit ? 1 : Math.ceil(findAll / limit);
    const remainingPages = pagesCount - page >= 0 ? pagesCount - page : 0;

    return { charges, pagesCount, remainingPages };
  }

  async update(id: number, dto: UpdateChargeDto): Promise<charge> {
    return await this.prismaService.charge.update({
      where: {
        id: id,
      },
      data: {
        title: dto.title,
        price: dto.price,
        type: dto.type,
        state: dto.state,
        frequency: dto.frequency,
        vendor_id: dto.vendor_id,
      },
    });
  }

  delete(id: number): Promise<charge> {
    throw new Error('Method not implemented.');
  }
}
