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
import { ParseStringPipe } from '../utils/customPipes';
import { InventoryService } from './inventory.service';
import { ControllerInterface } from '../utils/interfaces';
import { InventoryDto, updateInventoryDto } from './dto';
import { inventory_category } from '@prisma/client';
import { UpdateLocationDto } from '../locations/dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('JWT-auth')
@Controller('category/inventory')
export class InventoryController
  implements
    ControllerInterface<InventoryDto, updateInventoryDto, inventory_category>
{
  constructor(private readonly inventoryService: InventoryService) {}

  @UseInterceptors(CreateInterceptor)
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: InventoryDto) {
    return await this.inventoryService.create(dto);
  }

  @UseInterceptors(FindOneInterceptor)
  @Get('findOne/:id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const inventoryCategory = await this.inventoryService.findOne(id);

    if (!inventoryCategory) {
      throw new NotFoundException(`Inventory #${id} not found`);
    }

    return inventoryCategory;
  }

  @UseInterceptors(FindManyInterceptor)
  @Get('findSearch/:search')
  @HttpCode(HttpStatus.OK)
  async findSearch(@Param('search', ParseStringPipe) search: string) {
    return this.inventoryService.findSearch(search);
  }

  @UseInterceptors(FindManyInterceptor)
  @Get('findAll')
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return this.inventoryService.findAll();
  }

  @UseInterceptors(PageInterceptor)
  @Get('getPage')
  @HttpCode(HttpStatus.OK)
  async getPage(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.inventoryService.getPage(page, limit);
  }

  @UseInterceptors(UpdateInterceptor)
  @Patch('update')
  @HttpCode(HttpStatus.OK)
  async update(
    @Query('id', ParseIntPipe) id: number,
    @Body() dto: UpdateLocationDto,
  ) {
    return this.inventoryService.update(id, dto);
  }

  delete(id: number) {}
}
