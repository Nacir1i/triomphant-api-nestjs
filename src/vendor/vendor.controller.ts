import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
  HttpCode,
  HttpStatus,
  NotFoundException,
  UseInterceptors,
} from '@nestjs/common';
import { VendorService } from './vendor.service';
import { VendorDto, PartialTypedVendor } from './dto';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { ParseStringPipe } from '../utils/customPipes';
import { ControllerInterface } from '../utils/interfaces';
import { vendor } from '@prisma/client';
import { FindSearchInterceptor } from '../utils/interceptors';

@Controller('agent/vendor')
export class VendorController
  implements ControllerInterface<VendorDto, PartialTypedVendor, vendor>
{
  constructor(private readonly vendorService: VendorService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: VendorDto) {
    return this.vendorService.create(dto);
  }

  @Get('findOne/:id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const vendor = await this.vendorService.findOne(id);

    if (!vendor) {
      throw new NotFoundException(`Vendor ${id} not found`);
    }

    return vendor;
  }

  @UseInterceptors(FindSearchInterceptor)
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

  @Get('getPage')
  @HttpCode(HttpStatus.OK)
  async getPage(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.vendorService.getPage(page, limit);
  }

  @Patch('update/:id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVendorDto: PartialTypedVendor,
  ) {
    const vendor = this.vendorService.update(id, updateVendorDto);

    return vendor;
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id', ParseIntPipe) id: number) {
    const vendor = this.vendorService.delete(id);

    return vendor;
  }
}
