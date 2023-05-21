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
import { ParseStringPipe } from '../utils/customPipes';
import { AppointmentsService } from './appointments.service';
import { ControllerInterface } from '../utils/interfaces';
import { AppointmentDto, UpdateAppointmentDto } from './dto';
import { appointment } from '@prisma/client';
import { FindManyInterceptor } from '../utils/interceptors';

@Controller('appointments')
export class AppointmentsController
  implements
    ControllerInterface<AppointmentDto, UpdateAppointmentDto, appointment>
{
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: AppointmentDto) {
    return await this.appointmentsService.create(dto);
  }

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

  @Get('findAll')
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.appointmentsService.findAll();
  }

  @Get('getPage')
  @HttpCode(HttpStatus.OK)
  async getPage(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return await this.appointmentsService.getPage(page, limit);
  }

  @Patch('update')
  @HttpCode(HttpStatus.OK)
  async update(
    @Query('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAppointmentDto,
  ) {
    return await this.appointmentsService.update(id, dto);
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.appointmentsService.delete(id);
  }
}
