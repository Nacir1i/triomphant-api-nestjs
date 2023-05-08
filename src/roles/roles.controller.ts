import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Query,
  Delete,
  HttpCode,
  Param,
  HttpStatus,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { ParseStringPipe } from '../customPipes';
import { RoleDto, PartialTypedRoleDto } from './dto';

@Controller('role')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: RoleDto) {
    const role = await this.rolesService.create(dto);

    return role;
  }

  @Get('findOne/:id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const role = await this.rolesService.findOne(id);

    if (!role) {
      throw new NotFoundException('Role was not found');
    }

    return role;
  }

  @Get('findSearch/:search')
  @HttpCode(HttpStatus.OK)
  async findSearch(@Param('search', ParseStringPipe) search: string) {
    const roles = await this.rolesService.findSearch(search);

    return roles;
  }

  @Get('findAll')
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.rolesService.findAll();
  }

  @Patch('update')
  @HttpCode(HttpStatus.OK)
  async update(
    @Query('id', ParseIntPipe) id: number,
    @Body() dto: PartialTypedRoleDto,
  ) {
    return await this.rolesService.update(id, dto);
  }

  @Delete('delete')
  @HttpCode(HttpStatus.OK)
  async remove(@Query('id', ParseIntPipe) id: number) {
    return await this.rolesService.delete(id);
  }
}
