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
  findOne(@Query('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @Get('findAll')
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.rolesService.findAll();
  }

  @Patch('update')
  @HttpCode(HttpStatus.OK)
  update(@Query('id') id: string, @Body() dto: PartialTypedRoleDto) {
    return this.rolesService.update(+id, dto);
  }

  @Delete('delete')
  @HttpCode(HttpStatus.OK)
  remove(@Query('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
