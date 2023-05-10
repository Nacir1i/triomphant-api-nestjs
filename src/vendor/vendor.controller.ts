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
import { ParseStringPipe } from 'src/customPipes';

@Controller('agent/vendor')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: VendorDto) {
    return await this.vendorService.create(dto);
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

  @Get('findSearch/:search')
  @HttpCode(HttpStatus.OK)
  async findSearch(@Param('search', ParseStringPipe) search: string) {
    return await this.vendorService.findSearch(search);
  }

  @Get('findAll')
  async findAll() {
    return await this.vendorService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVendorDto: PartialTypedVendor) {
    return this.vendorService.update(+id, updateVendorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vendorService.remove(+id);
  }
}
