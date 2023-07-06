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
import { ParseStringPipe } from '../utils/customPipes';
import { CustomerService } from './customer.service';
import {
  CustomerCommentDto,
  CustomerCommentNoteDto,
  CustomerDto,
  PartialTypedCustomer,
} from './dto';
import { ControllerInterface } from '../utils/interfaces';
import { customer } from '@prisma/client';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('JWT-auth')
@Controller('agent/customer')
export class CustomerController
  implements ControllerInterface<CustomerDto, PartialTypedCustomer, customer>
{
  constructor(private customerService: CustomerService) {}

  @UseInterceptors(CreateInterceptor)
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CustomerDto) {
    return this.customerService.create(dto);
  }

  @UseInterceptors(FindOneInterceptor)
  @Get('findOne/:id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const customer = await this.customerService.findOne(id);

    if (!customer) {
      throw new NotFoundException();
    }

    return customer;
  }

  @UseInterceptors(FindManyInterceptor)
  @Get('findSearch/:search')
  @HttpCode(HttpStatus.OK)
  async findSearch(@Param('search', ParseStringPipe) search: string) {
    const customers = await this.customerService.findSearch(search);

    return customers;
  }

  @UseInterceptors(FindManyInterceptor)
  @Get('findAll')
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.customerService.findAll();
  }

  @UseInterceptors(PageInterceptor)
  @Get('getPage')
  @HttpCode(HttpStatus.OK)
  async getPage(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.customerService.getPage(page, limit);
  }

  @UseInterceptors(UpdateInterceptor)
  @Patch('update')
  @HttpCode(HttpStatus.OK)
  async update(
    @Query('id', ParseIntPipe) id: number,
    @Body() dto: PartialTypedCustomer,
  ) {
    const updated = await this.customerService.update(id, dto);

    return updated;
  }

  @UseInterceptors(CreateInterceptor)
  @Post('comment/create')
  @HttpCode(HttpStatus.CREATED)
  async createComment(@Body() dto: CustomerCommentDto) {
    return await this.customerService.createComment(dto);
  }

  @UseInterceptors(CreateInterceptor)
  @Get('comment/findAll/:id')
  @HttpCode(HttpStatus.CREATED)
  async findCustomerComments(@Param('id', ParseIntPipe) id: number) {
    return await this.customerService.findCustomerComments(id);
  }

  @UseInterceptors(CreateInterceptor)
  @Post('comment/note/create')
  @HttpCode(HttpStatus.CREATED)
  async createCommentNote(@Body() dto: CustomerCommentNoteDto) {
    return this.customerService.createCommentNote(dto);
  }

  @UseInterceptors(DeleteInterceptor)
  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.customerService.delete(id);
  }
}
