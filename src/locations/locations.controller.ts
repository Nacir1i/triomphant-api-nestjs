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
  Param,
  UseInterceptors,
} from '@nestjs/common';
import {
  CreateInterceptor,
  FindOneInterceptor,
  FindManyInterceptor,
  UpdateInterceptor,
  PageInterceptor,
} from '../utils/interceptors';
import { LocationsService } from './locations.service';
import { ControllerInterface } from '../utils/interfaces';
import { LocationDto, UpdateLocationDto } from './dto';
import { location } from '@prisma/client';
import { ParseStringPipe } from '../utils/customPipes';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('JWT-auth')
@Controller('category/locations')
export class LocationsController
  implements ControllerInterface<LocationDto, UpdateLocationDto, location>
{
  constructor(private readonly locationsService: LocationsService) {}

  @UseInterceptors(CreateInterceptor)
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: LocationDto) {
    return await this.locationsService.create(dto);
  }

  @UseInterceptors(FindOneInterceptor)
  @Get('findOne/:id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const location = await this.locationsService.findOne(id);

    if (!location) {
      throw new NotFoundException(`Location #${id} not found`);
    }

    return location;
  }

  @UseInterceptors(FindManyInterceptor)
  @Get('findSearch/:search')
  @HttpCode(HttpStatus.OK)
  async findSearch(@Param('search', ParseStringPipe) search: string) {
    return await this.locationsService.findSearch(search);
  }

  @UseInterceptors(FindManyInterceptor)
  @Get('findAll')
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.locationsService.findAll();
  }

  @UseInterceptors(PageInterceptor)
  @Get('getPage')
  @HttpCode(HttpStatus.OK)
  async getPage(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return await this.locationsService.getPage(page, limit);
  }

  @UseInterceptors(UpdateInterceptor)
  @Patch('update')
  @HttpCode(HttpStatus.OK)
  async update(
    @Query('id', ParseIntPipe) id: number,
    @Body() dto: UpdateLocationDto,
  ) {
    return await this.locationsService.update(id, dto);
  }

  delete(id: number) {
    throw new Error('Method not implemented.');
  }
}
