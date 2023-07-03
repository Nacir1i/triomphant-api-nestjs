import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import BaseInterceptor from 'src/utils/interceptors/baseInterceptor';

@ApiBearerAuth('JWT-auth')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @UseInterceptors(new BaseInterceptor('Dashboard stats'))
  @Get('get')
  @HttpCode(HttpStatus.OK)
  async getDashboardStats() {
    return await this.dashboardService.getDashboard();
  }
}
