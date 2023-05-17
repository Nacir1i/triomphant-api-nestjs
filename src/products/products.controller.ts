import { Controller } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ControllerInterface } from 'src/utils/interfaces';
import { ProductDto, UpdateProductDto } from './dto';
import { product } from '@prisma/client';

@Controller('products')
export class ProductsController
  implements ControllerInterface<ProductDto, UpdateProductDto, product>
{
  constructor(private readonly productsService: ProductsService) {}

  create(dto: ProductDto) {
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

  update(id: number, dto: UpdateProductDto) {
    throw new Error('Method not implemented.');
  }

  delete(id: number) {
    throw new Error('Method not implemented.');
  }
}
