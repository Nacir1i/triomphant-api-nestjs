import { Injectable } from '@nestjs/common';
import { ServiceInterface } from 'src/utils/interfaces';
import { ProductDto, UpdateProductDto } from './dto';
import { product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService
  implements ServiceInterface<ProductDto, UpdateProductDto, product>
{
  constructor(private readonly prismaService: PrismaService) {}

  create(dto: ProductDto): Promise<product> {
    throw new Error('Method not implemented.');
  }

  findOne(id: number): Promise<product> {
    throw new Error('Method not implemented.');
  }

  findSearch(search: string): Promise<[] | product[]> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<[] | product[]> {
    throw new Error('Method not implemented.');
  }

  getPage(page: number, limit: number): object {
    throw new Error('Method not implemented.');
  }

  update(id: number, dto: UpdateProductDto): Promise<product> {
    throw new Error('Method not implemented.');
  }

  delete(id: number): Promise<product> {
    throw new Error('Method not implemented.');
  }
}
