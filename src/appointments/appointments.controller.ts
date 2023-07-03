import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Query,
  Delete,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import {
  CreateInterceptor,
  DeleteInterceptor,
  FindOneInterceptor,
  FindManyInterceptor,
  UpdateInterceptor,
  PageInterceptor,
} from '../utils/interceptors';
import { ParseStringPipe, ParseIsoDatePipe } from '../utils/customPipes';
import { AppointmentsService } from './appointments.service';
import { ControllerInterface } from '../utils/interfaces';
import { AppointmentDto, UpdateAppointmentDto } from './dto';
import { appointment } from '@prisma/client';
import { ApiBearerAuth } from '@nestjs/swagger';

import { Public } from 'src/utils/decorators';
import BaseInterceptor from 'src/utils/interceptors/baseInterceptor';

@Public()
@ApiBearerAuth('JWT-auth')
@Controller('appointments')
export class AppointmentsController
  implements
    ControllerInterface<AppointmentDto, UpdateAppointmentDto, appointment>
{
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @UseInterceptors(CreateInterceptor)
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: AppointmentDto) {
    return await this.appointmentsService.create(dto);
  }

  @UseInterceptors(FindOneInterceptor)
  @Get('findOne/:id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.appointmentsService.findOne(id);
  }

  @UseInterceptors(FindManyInterceptor)
  @Get('findSearch/:search')
  @HttpCode(HttpStatus.OK)
  async findSearch(@Param('search', ParseStringPipe) search: string) {
    return await this.appointmentsService.findSearch(search);
  }

  @UseInterceptors(new BaseInterceptor('Appointment month'))
  @Get('findMonth')
  @HttpCode(HttpStatus.OK)
  async findMonth(@Query('date', ParseIsoDatePipe) date: string) {
    return await this.appointmentsService.findMonth(date);
  }

  @UseInterceptors(new BaseInterceptor('Appointment stats'))
  @Get('getStats')
  @HttpCode(HttpStatus.OK)
  async getStats() {
    return await this.appointmentsService.getStats();
  }

  @UseInterceptors(FindManyInterceptor)
  @Get('findAll')
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.appointmentsService.findAll();
  }

  @UseInterceptors(PageInterceptor)
  @Get('getPage')
  @HttpCode(HttpStatus.OK)
  async getPage(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return await this.appointmentsService.getPage(page, limit);
  }

  @Get('getCalendarPage')
  @HttpCode(HttpStatus.OK)
  async getCalendarPage(@Query('date', ParseIsoDatePipe) date: string) {
    return this.appointmentsService.getCalendarPage(date);
  }

  @UseInterceptors(UpdateInterceptor)
  @Patch('update')
  @HttpCode(HttpStatus.OK)
  async update(
    @Query('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAppointmentDto,
  ) {
    return await this.appointmentsService.update(id, dto);
  }

  @UseInterceptors(DeleteInterceptor)
  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.appointmentsService.delete(id);
  }
}
