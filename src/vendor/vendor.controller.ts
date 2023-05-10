import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { VendorService } from './vendor.service';
import { VendorDto, PartialTypedVendor } from './dto';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { ParseStringPipe } from '../customPipes';
import { Prisma } from '@prisma/client';

@Controller('agent/vendor')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: VendorDto) {
    return this.vendorService.create(dto);
  }

  @Get('findOne/:id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseIntPipe) id: number) {
    const vendor = this.vendorService.findOne(id);

    if (!vendor) {
      throw new NotFoundException(`Vendor ${id} not found`);
    }

    return vendor;
  }

  @Get('findSearch/:search')
  @HttpCode(HttpStatus.OK)
  findSearch(@Param('search', ParseStringPipe) search: string) {
    return this.vendorService.findSearch(search);
  }

  @Get('findAll')
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.vendorService.findAll();
  }

  @Patch('update/:id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVendorDto: PartialTypedVendor,
  ) {
    try {
      const vendor = this.vendorService.update(id, updateVendorDto);

      return vendor;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(error.meta?.cause);
        }
      }

      throw error;
    }
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id', ParseIntPipe) id: number) {
    try {
      const vendor = this.vendorService.delete(id);
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
