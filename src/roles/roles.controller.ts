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
  UseInterceptors,
} from '@nestjs/common';
import {
  CreateInterceptor,
  DeleteInterceptor,
  FindManyInterceptor,
  FindOneInterceptor,
  UpdateInterceptor,
} from '../utils/interceptors';
import { RolesService } from './roles.service';
import { ParseStringPipe } from '../utils/customPipes';
import { RoleDto, PartialTypedRoleDto } from './dto';
import { ControllerInterface } from '../utils/interfaces';
import { role } from '@prisma/client';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('JWT-auth')
@Controller('role')
export class RolesController
  implements ControllerInterface<RoleDto, PartialTypedRoleDto, role>
{
  constructor(private readonly rolesService: RolesService) {}

  @UseInterceptors(CreateInterceptor)
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: RoleDto) {
    const role = await this.rolesService.create(dto);

    return role;
  }

  @UseInterceptors(FindOneInterceptor)
  @Get('findOne/:id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const role = await this.rolesService.findOne(id);

    if (!role) {
      throw new NotFoundException('Role was not found');
    }

    return role;
  }

  @UseInterceptors(FindManyInterceptor)
  @Get('findSearch/:search')
  @HttpCode(HttpStatus.OK)
  async findSearch(@Param('search', ParseStringPipe) search: string) {
    const roles = await this.rolesService.findSearch(search);

    return roles;
  }

  @UseInterceptors(FindManyInterceptor)
  @Get('findAll')
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.rolesService.findAll();
  }

  getPage() {}

  @UseInterceptors(UpdateInterceptor)
  @Patch('update')
  @HttpCode(HttpStatus.OK)
  async update(
    @Query('id', ParseIntPipe) id: number,
    @Body() dto: PartialTypedRoleDto,
  ) {
    return await this.rolesService.update(id, dto);
  }

  @UseInterceptors(DeleteInterceptor)
  @Delete('delete')
  @HttpCode(HttpStatus.OK)
  async delete(@Query('id', ParseIntPipe) id: number) {
    return await this.rolesService.delete(id);
  }
}
