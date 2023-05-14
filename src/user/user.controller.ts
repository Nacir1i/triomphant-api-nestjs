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
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto, PartialTypedUser } from './dto';
import { ControllerInterface } from 'src/utils/interfaces';
import { user } from '@prisma/client';
import { ParseStringPipe } from 'src/utils/customPipes';

@Controller('user')
export class UserController
  implements ControllerInterface<UserDto, PartialTypedUser, user>
{
  constructor(private userService: UserService) {}

  create(dto: UserDto) {}

  @Get('findOne/:id')
  @HttpCode(HttpStatus.OK)
  async findOne(id: number) {}

  @Get('findOne/:search')
  @HttpCode(HttpStatus.OK)
  async findSearch(@Param('search', ParseStringPipe) search: string) {}

  @Get('findAll')
  @HttpCode(HttpStatus.OK)
  async findAll() {}

  @Patch('update')
  @HttpCode(HttpStatus.OK)
  async update(
    @Query('id', ParseIntPipe) id: number,
    @Body() dto: PartialTypedUser,
  ) {}

  @Get('getPage')
  @HttpCode(HttpStatus.OK)
  async getPage(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    throw new Error('Method not implemented.');
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id', ParseIntPipe) id: number) {
    throw new Error('Method not implemented.');
  }
}
