import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  Param,
  Patch,
  Delete,
  NotFoundException,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto, PartialTypedUser } from './dto';
import { ControllerInterface } from '../utils/interfaces';
import { user } from '@prisma/client';
import { ParseStringPipe } from '../utils/customPipes';
import { FindSearchInterceptor } from '../utils/interceptors';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('JWT-auth')
@Controller('user')
export class UserController
  implements ControllerInterface<UserDto, PartialTypedUser, user>
{
  constructor(private userService: UserService) {}

  create(dto: UserDto) {}

  @Get('findOne/:id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new NotFoundException(`User#${id} not found`);
    }

    return user;
  }

  @UseInterceptors(FindSearchInterceptor)
  @Get('findSearch/:search')
  @HttpCode(HttpStatus.OK)
  async findSearch(@Param('search', ParseStringPipe) search: string) {
    return await this.userService.findSearch(search);
  }

  @Get('findAll')
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.userService.findAll();
  }

  @Get('getPage')
  @HttpCode(HttpStatus.OK)
  async getPage(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return await this.userService.getPage(page, limit);
  }

  @Patch('update')
  @HttpCode(HttpStatus.OK)
  async update(
    @Query('id', ParseIntPipe) id: number,
    @Body() dto: PartialTypedUser,
  ) {
    return await this.userService.update(id, dto);
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.delete(id);
  }
}
