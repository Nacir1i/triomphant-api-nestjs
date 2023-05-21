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
import { ProductsService } from './products.service';
import { ControllerInterface } from '../utils/interfaces';
import { ProductDto, UpdateProductDto } from './dto';
import { product } from '@prisma/client';
import { FindManyInterceptor } from '../utils/interceptors';

@Controller('products')
export class ProductsController
  implements ControllerInterface<ProductDto, UpdateProductDto, product>
{
  constructor(private readonly productsService: ProductsService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: ProductDto) {
    return await this.productsService.create(dto);
  }

  @Get('findOne/:id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const product = await this.productsService.findOne(id);

    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }
  }

  @UseInterceptors(FindManyInterceptor)
  @Get('findSearch/:search')
  @HttpCode(HttpStatus.OK)
  async findSearch(@Param('search', ParseStringPipe) search: string) {
    return await this.productsService.findSearch(search);
  }

  @Get('findAll')
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.productsService.findAll();
  }

  @Get('getPage')
  @HttpCode(HttpStatus.OK)
  async getPage(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return await this.productsService.getPage(page, limit);
  }

  @Patch('update')
  @HttpCode(HttpStatus.OK)
  async update(
    @Query('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductDto,
  ) {
    return await this.productsService.update(id, dto);
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.productsService.delete(id);
  }
}
