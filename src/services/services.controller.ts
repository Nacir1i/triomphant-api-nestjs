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
import {
  CreateInterceptor,
  DeleteInterceptor,
  FindManyInterceptor,
  FindOneInterceptor,
  PageInterceptor,
  UpdateInterceptor,
} from '../utils/interceptors';
import { ParseStringPipe } from '../utils/customPipes';
import { ServicesService } from './services.service';
import { ControllerInterface } from '../utils/interfaces';
import { ServiceDto, UpdateServiceDTO } from './dto';
import { service } from '@prisma/client';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('JWT-auth')
@Controller('services')
export class ServicesController
  implements ControllerInterface<ServiceDto, UpdateServiceDTO, service>
{
  constructor(private readonly servicesService: ServicesService) {}

  @UseInterceptors(CreateInterceptor)
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: ServiceDto) {
    return await this.servicesService.create(dto);
  }

  @UseInterceptors(FindOneInterceptor)
  @Get('findOne/:id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const service = await this.servicesService.findOne(id);

    if (!service) {
      throw new NotFoundException(`Service ${id} not found`);
    }

    return service;
  }

  @UseInterceptors(FindManyInterceptor)
  @Get('findSearch/:search')
  @HttpCode(HttpStatus.OK)
  async findSearch(@Param('search', ParseStringPipe) search: string) {
    return await this.servicesService.findSearch(search);
  }

  @UseInterceptors(FindManyInterceptor)
  @Get('findAll')
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.servicesService.findAll();
  }

  @UseInterceptors(PageInterceptor)
  @Get('getPage')
  @HttpCode(HttpStatus.OK)
  async getPage(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return await this.servicesService.getPage(page, limit);
  }

  @UseInterceptors(UpdateInterceptor)
  @Patch('update')
  @HttpCode(HttpStatus.OK)
  async update(
    @Query('id', ParseIntPipe) id: number,
    @Body() dto: UpdateServiceDTO,
  ) {
    return await this.servicesService.update(id, dto);
  }

  @UseInterceptors(DeleteInterceptor)
  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.servicesService.delete(id);
  }
}
