import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { OrdersService } from 'src/orders/orders.service';
import { CustomerService } from 'src/customer/customer.service';
import { AppointmentsService } from 'src/appointments/appointments.service';

@Module({
  imports: [],
  controllers: [DashboardController],
  providers: [
    DashboardService,
    OrdersService,
    CustomerService,
    AppointmentsService,
  ],
})
export class DashboardModule {}
