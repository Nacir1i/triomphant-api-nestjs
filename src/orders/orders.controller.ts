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
} from '@nestjs/common';
import { ParseStringPipe } from '../utils/customPipes';
import { OrdersService } from './orders.service';
import { ControllerInterface } from '../utils/interfaces';
import { OrderDto, UpdateOrderDto } from './dto';
import { order } from '@prisma/client';

@Controller('orders')
export class OrdersController
  implements ControllerInterface<OrderDto, UpdateOrderDto, order>
{
  constructor(private readonly ordersService: OrdersService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: OrderDto) {
    return await this.ordersService.create(dto);
  }

  @Get('findOne/:id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const order = await this.ordersService.findOne(id);
    if (!order) throw new NotFoundException(`Order #${id} not found`);
  }

  @Get('findSearch/:search')
  @HttpCode(HttpStatus.OK)
  async findSearch(@Param('search', ParseStringPipe) search: string) {
    return await this.ordersService.findSearch(search);
  }

  @Get('findAll')
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.ordersService.findAll();
  }

  @Get('getPage')
  @HttpCode(HttpStatus.OK)
  async getPage(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return await this.ordersService.getPage(page, limit);
  }

  @Patch('update')
  @HttpCode(HttpStatus.OK)
  async update(
    @Query('id', ParseIntPipe) id: number,
    @Body() dto: UpdateOrderDto,
  ) {
    return await this.ordersService.update(id, dto);
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.ordersService.delete(id);
  }
}
