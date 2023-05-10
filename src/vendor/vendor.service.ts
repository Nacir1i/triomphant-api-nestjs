import { Injectable, NotFoundException } from '@nestjs/common';
import { VendorDto, PartialTypedVendor } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { vendor, Prisma } from '@prisma/client';

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

  async findSearch(search: string): Promise<vendor[] | []> {
    return await this.prismaService.vendor.findMany({
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
            company_name: {
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
  }

  async findOne(id: number): Promise<vendor | null> {
    return await this.prismaService.vendor.findUnique({
      where: {
        id: id,
      },
      include: {
        contact_information: true,
        bank_information: true,
      },
    });
  }

  async findAll(): Promise<vendor[] | []> {
    return await this.prismaService.vendor.findMany({
      where: {
        is_deleted: false,
      },
    });
  }

  async getPage(page: number, limit: number): Promise<object> {
    const startIndex = (page - 1) * limit;

    const vendors = await this.prismaService.vendor.findMany({
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

    return { vendors, pagesCount, remainingPages };
  }

  async update(id: number, dto: PartialTypedVendor): Promise<vendor> {
    try {
      return await this.prismaService.vendor.update({
        where: {
          id: id,
        },
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
              content: 'Vendor updated successfully',
            },
          },
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(error.meta?.cause);
        }
      }

      throw error;
    }
  }

  async delete(id: number) {
    try {
      return await this.prismaService.vendor.update({
        where: {
          id: id,
        },
        data: {
          is_deleted: true,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(error.meta?.cause);
        }
      }

      throw error;
    }
  }
}
