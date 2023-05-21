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
} from '@nestjs/common';
import { ParseStringPipe } from '../utils/customPipes';
import { InventoryService } from './inventory.service';
import { ControllerInterface } from '../utils/interfaces';
import { InventoryDto, updateInventoryDto } from './dto';
import { inventory_category } from '@prisma/client';
import { UpdateLocationDto } from '../locations/dto';

@Controller('category/inventory')
export class InventoryController
  implements
    ControllerInterface<InventoryDto, updateInventoryDto, inventory_category>
{
  constructor(private readonly inventoryService: InventoryService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: InventoryDto) {
    return await this.inventoryService.create(dto);
  }

  @Get('findOne/:id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const inventoryCategory = await this.inventoryService.findOne(id);

    if (!inventoryCategory) {
      throw new NotFoundException(`Inventory #${id} not found`);
    }

    return inventoryCategory;
  }

  @Get('findSearch/:search')
  @HttpCode(HttpStatus.OK)
  async findSearch(@Param('search', ParseStringPipe) search: string) {
    return this.inventoryService.findSearch(search);
  }

  @Get('findAll')
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return this.inventoryService.findAll();
  }

  @Get('getPage')
  @HttpCode(HttpStatus.OK)
  async getPage(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.inventoryService.getPage(page, limit);
  }

  @Patch('update')
  @HttpCode(HttpStatus.OK)
  async update(
    @Query('id', ParseIntPipe) id: number,
    @Body() dto: UpdateLocationDto,
  ) {
    return this.inventoryService.update(id, dto);
  }

  delete(id: number) {
    throw new Error('Method not implemented.');
  }
}
