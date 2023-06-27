import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { Public } from '../utils/decorators';

@Controller('ping')
export class PingController {
  constructor() {}

  @Public()
  @Get('ping')
  @HttpCode(HttpStatus.OK)
  ping(): object {
    return { message: 'pong' };
  }
}
