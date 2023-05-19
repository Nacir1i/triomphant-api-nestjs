import { Controller } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ControllerInterface } from '../utils/interfaces';
import { OrderDto, UpdateOrderDto } from './dto';
import { order } from '@prisma/client';

@Controller('orders')
export class OrdersController
  implements ControllerInterface<OrderDto, UpdateOrderDto, order>
{
  constructor(private readonly ordersService: OrdersService) {}

  create(dto: OrderDto) {
    throw new Error('Method not implemented.');
  }

  findOne(id: number) {
    throw new Error('Method not implemented.');
  }

  findSearch(search: string) {
    throw new Error('Method not implemented.');
  }

  findAll() {
    throw new Error('Method not implemented.');
  }

  getPage(page: number, limit: number) {
    throw new Error('Method not implemented.');
  }

  update(id: number, dto: UpdateOrderDto) {
    throw new Error('Method not implemented.');
  }

  delete(id: number) {
    throw new Error('Method not implemented.');
  }
}
