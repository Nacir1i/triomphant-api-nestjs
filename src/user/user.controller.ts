import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('get')
  async getUser(@Body() dto: UserDto) {
    try {
      const user = await this.userService.getUser(dto);

      if (!user) {
        throw new NotFoundException(`User was not found`);
      }

      return user;
    } catch (error) {
      throw error;
    }
  }
}
