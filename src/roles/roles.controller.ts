import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { RoleDto, PartialTypedRoleDto } from './dto';

@Controller('role')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: RoleDto) {
    return this.rolesService.create(dto);
  }

  @Post('findOne')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.rolesService.findAll();
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() dto: PartialTypedRoleDto) {
    return this.rolesService.update(+id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
