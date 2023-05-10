import { Injectable } from '@nestjs/common';
import { VendorDto, PartialTypedVendor } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { vendor } from '@prisma/client';

@Injectable()
export class VendorService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: VendorDto): Promise<vendor> {
    return await this.prismaService.vendor.create({
      data: {
        first_name: dto.firstName,
        last_name: dto.lastName,
        company_name: dto.companyName,
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
        logs: {
          create: {
            content: `Vendor ${dto.firstName} ${dto.lastName} create successfully`,
          },
        },
      },
    });
  }

  findAll() {
    return `This action returns all vendor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vendor`;
  }

  update(id: number, dto: PartialTypedVendor) {
    return `This action updates a #${id} vendor`;
  }

  remove(id: number) {
    return `This action removes a #${id} vendor`;
  }
}
