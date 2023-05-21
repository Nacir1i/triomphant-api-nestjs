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
import { MaterialsService } from './materials.service';
import { ControllerInterface } from '../utils/interfaces';
import { MaterialDto, UpdateMaterialDto } from './dto';
import { material } from '@prisma/client';
import { FindManyInterceptor } from '../utils/interceptors';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('JWT-auth')
@Controller('materials')
export class MaterialsController
  implements ControllerInterface<MaterialDto, UpdateMaterialDto, material>
{
  constructor(private readonly materialsService: MaterialsService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: MaterialDto) {
    return await this.materialsService.create(dto);
  }

  @Get('findOne/:id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const material = await this.materialsService.findOne(id);

    if (!material) {
      throw new NotFoundException(`Material ${id} not found`);
    }
  }

  @UseInterceptors(FindManyInterceptor)
  @Get('findSearch/:search')
  @HttpCode(HttpStatus.OK)
  async findSearch(@Param('search', ParseStringPipe) search: string) {
    return await this.findSearch(search);
  }

  @Get('findAll')
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.findAll();
  }

  @Get('getPage')
  @HttpCode(HttpStatus.OK)
  async getPage(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return await this.materialsService.getPage(page, limit);
  }

  @Patch('update')
  @HttpCode(HttpStatus.OK)
  async update(
    @Query('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMaterialDto,
  ) {
    return await this.materialsService.update(id, dto);
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.materialsService.delete(id);
  }
}
