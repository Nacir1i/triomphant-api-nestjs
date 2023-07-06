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
import {
  CreateInterceptor,
  DeleteInterceptor,
  FindManyInterceptor,
  FindOneInterceptor,
  PageInterceptor,
  UpdateInterceptor,
} from '../utils/interceptors';
import { VendorService } from './vendor.service';
import {
  VendorDto,
  PartialTypedVendor,
  VendorCommentDto,
  VendorCommentNoteDto,
} from './dto';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { ParseStringPipe } from '../utils/customPipes';
import { ControllerInterface } from '../utils/interfaces';
import { vendor } from '@prisma/client';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('JWT-auth')
@Controller('agent/vendor')
export class VendorController
  implements ControllerInterface<VendorDto, PartialTypedVendor, vendor>
{
  constructor(private readonly vendorService: VendorService) {}

  @UseInterceptors(CreateInterceptor)
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: VendorDto) {
    return this.vendorService.create(dto);
  }

  @UseInterceptors(FindOneInterceptor)
  @Get('findOne/:id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const vendor = await this.vendorService.findOne(id);

    if (!vendor) {
      throw new NotFoundException(`Vendor ${id} not found`);
    }

    return vendor;
  }

  @UseInterceptors(FindManyInterceptor)
  @Get('findSearch/:search')
  @HttpCode(HttpStatus.OK)
  findSearch(@Param('search', ParseStringPipe) search: string) {
    return this.vendorService.findSearch(search);
  }

  @UseInterceptors(FindManyInterceptor)
  @Get('findAll')
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.vendorService.findAll();
  }

  @UseInterceptors(PageInterceptor)
  @Get('getPage')
  @HttpCode(HttpStatus.OK)
  async getPage(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.vendorService.getPage(page, limit);
  }

  @UseInterceptors(UpdateInterceptor)
  @Patch('update/:id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVendorDto: PartialTypedVendor,
  ) {
    const vendor = this.vendorService.update(id, updateVendorDto);

    return vendor;
  }

  @UseInterceptors(CreateInterceptor)
  @Post('comment/create')
  @HttpCode(HttpStatus.CREATED)
  async createComment(@Body() dto: VendorCommentDto) {
    return await this.vendorService.createComment(dto);
  }

  @UseInterceptors(CreateInterceptor)
  @Get('comment/findAll/:id')
  @HttpCode(HttpStatus.CREATED)
  async findCustomerComments(@Param('id', ParseIntPipe) id: number) {
    return await this.vendorService.findVendorComments(id);
  }

  @UseInterceptors(CreateInterceptor)
  @Post('comment/note/create')
  @HttpCode(HttpStatus.CREATED)
  async createCommentNote(@Body() dto: VendorCommentNoteDto) {
    return this.vendorService.createCommentNote(dto);
  }

  @UseInterceptors(DeleteInterceptor)
  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id', ParseIntPipe) id: number) {
    const vendor = this.vendorService.delete(id);

    return vendor;
  }
}
