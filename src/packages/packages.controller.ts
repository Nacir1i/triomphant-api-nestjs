import {
  Controller,
  Post,
  Get,
  Patch,
  NotFoundException,
  Body,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Query,
  Delete,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { ParseStringPipe } from '../utils/customPipes';
import { PackagesService } from './packages.service';
import { PackageDto, UpdatePackageDto } from './dto';
import { Renamedpackage } from '@prisma/client';
import { ControllerInterface } from '../utils/interfaces';
import { FindSearchInterceptor } from '../utils/interceptors';

@Controller('packages')
export class PackagesController
  implements ControllerInterface<PackageDto, UpdatePackageDto, Renamedpackage>
{
  constructor(private readonly packagesService: PackagesService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: PackageDto) {
    return await this.packagesService.create(dto);
  }

  @Get('findOne/:id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const pack = await this.packagesService.findOne(id);

    if (!pack) {
      throw new NotFoundException(`Package ${id} not found`);
    }

    return pack;
  }

  @UseInterceptors(FindSearchInterceptor)
  @Get('findSearch/:search')
  @HttpCode(HttpStatus.OK)
  async findSearch(@Param('search', ParseStringPipe) search: string) {
    return await this.packagesService.findSearch(search);
  }

  @Get('findAll')
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.packagesService.findAll();
  }

  @Get('getPage')
  @HttpCode(HttpStatus.OK)
  async getPage(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return await this.packagesService.getPage(page, limit);
  }

  @Patch('update')
  @HttpCode(HttpStatus.OK)
  async update(
    @Query('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePackageDto,
  ) {
    return await this.packagesService.update(id, dto);
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.packagesService.delete(id);
  }
}
