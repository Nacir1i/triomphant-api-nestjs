import { Injectable } from '@nestjs/common';
import { VendorDto, PartialTypedVendor } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VendorService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: VendorDto) {
    return 'This action adds a new vendor';
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
