import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get('findAll')
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.notificationsService.findAll();
  }

  @Get('findRelated')
  @HttpCode(HttpStatus.OK)
  async findRelated(
    @Query('role', ParseIntPipe) role: number,
    @Query('user', ParseIntPipe) user: number,
  ) {
    return await this.notificationsService.findRelated(role, user);
  }

  @Get('findRecent')
  @HttpCode(HttpStatus.OK)
  async findRecent() {
    return await this.notificationsService.findRecent();
  }
}
