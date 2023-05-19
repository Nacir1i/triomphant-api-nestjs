import { Injectable } from '@nestjs/common';
import { ServiceInterface } from '../utils/interfaces';
import { OrderDto, UpdateOrderDto } from './dto';
import { order } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrdersService
  implements ServiceInterface<OrderDto, UpdateOrderDto, order>
{
  constructor(private readonly prismaService: PrismaService) {}

  create(dto: OrderDto): Promise<order> {
    throw new Error('Method not implemented.');
  }

  findOne(id: number): Promise<order> {
    throw new Error('Method not implemented.');
  }

  findSearch(search: string): Promise<[] | order[]> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<[] | order[]> {
    throw new Error('Method not implemented.');
  }

  getPage(page: number, limit: number): Promise<object> {
    throw new Error('Method not implemented.');
  }

  update(id: number, dto: UpdateOrderDto): Promise<order> {
    throw new Error('Method not implemented.');
  }

  delete(id: number): Promise<order> {
    throw new Error('Method not implemented.');
  }
}
