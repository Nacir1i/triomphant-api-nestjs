import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto, PartialTypedUser } from './dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('findOne')
  @HttpCode(HttpStatus.OK)
  async findOne(@Body() dto: PartialTypedUser) {
    const user = await this.userService.getUser(dto);

    if (!user) {
      throw new NotFoundException(`User was not found`);
    }

    return user;
  }
}
