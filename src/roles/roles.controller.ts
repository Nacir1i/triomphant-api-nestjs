import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Query,
  Delete,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { RolesService } from './roles.service';
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

  @Post('findOne')
  @HttpCode(HttpStatus.OK)
  async findOne(@Body() dto: PartialTypedRoleDto) {
    const role = await this.rolesService.findOne(dto);

    if (!role) {
      throw new NotFoundException('Role was not found');
    }

    return role;
  }

  @Get('findAll')
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.rolesService.findAll();
  }

  @Patch('update')
  @HttpCode(HttpStatus.OK)
  async update(@Query('id') id: number, @Body() dto: PartialTypedRoleDto) {
    return await this.rolesService.update(id, dto);
  }

  @Delete('delete')
  @HttpCode(HttpStatus.OK)
  remove(@Query('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
