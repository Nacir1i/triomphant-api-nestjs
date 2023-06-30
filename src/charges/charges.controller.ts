import {
  Controller,
  Post,
  Get,
  Patch,
  NotFoundException,
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
import { ParseStringPipe, ParseCustomEnumPipe } from '../utils/customPipes';
import { ChargesService } from './charges.service';
import { ControllerInterface } from '../utils/interfaces';
import { ChargeDto, UpdateChargeDto } from './dto';
import { charge, charge_state, charge_type } from '@prisma/client';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('JWT-auth')
@Controller('charges')
export class ChargesController
  implements ControllerInterface<ChargeDto, UpdateChargeDto, charge>
{
  constructor(private readonly chargesService: ChargesService) {}

  @UseInterceptors(CreateInterceptor)
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: ChargeDto): Promise<charge> {
    return await this.chargesService.create(dto);
  }

  @UseInterceptors(FindOneInterceptor)
  @Get('findOne/:id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const customer = await this.chargesService.findOne(id);

    if (!customer) {
      throw new NotFoundException();
    }

    return customer;
  }

  @UseInterceptors(FindManyInterceptor)
  @Get('findSearch/:search')
  @HttpCode(HttpStatus.OK)
  async findSearch(@Param('search', ParseStringPipe) search: string) {
    return await this.chargesService.findSearch(search);
  }

  @UseInterceptors(FindManyInterceptor)
  @Get('findByType/:type')
  @HttpCode(HttpStatus.OK)
  async findByType(
    @Param('type', new ParseCustomEnumPipe(charge_type)) type: charge_type,
  ) {
    return await this.chargesService.findByType(type);
  }

  @UseInterceptors(FindManyInterceptor)
  @Get('findByState/:state')
  @HttpCode(HttpStatus.OK)
  async findByState(
    @Param('state', new ParseCustomEnumPipe(charge_state))
    state: charge_state,
  ) {
    return await this.chargesService.findByState(state);
  }

  @UseInterceptors(FindManyInterceptor)
  @Get('findAll')
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.chargesService.findAll();
  }

  @UseInterceptors(PageInterceptor)
  @Get('getPage')
  @HttpCode(HttpStatus.OK)
  async getPage(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.chargesService.getPage(page, limit);
  }

  @UseInterceptors(UpdateInterceptor)
  @Patch('update')
  @HttpCode(HttpStatus.OK)
  async update(
    @Query('id', ParseIntPipe) id: number,
    @Body() dto: UpdateChargeDto,
  ) {
    const updated = await this.chargesService.update(id, dto);

    return updated;
  }

  @UseInterceptors(DeleteInterceptor)
  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.chargesService.delete(id);
  }
}
