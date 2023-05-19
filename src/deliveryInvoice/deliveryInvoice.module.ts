import { Module } from '@nestjs/common';
import { DeliveryInvoiceService } from './delivery-invoice.service';
import { DeliveryInvoiceController } from './delivery-invoice.controller';

@Module({
  controllers: [DeliveryInvoiceController],
  providers: [DeliveryInvoiceService]
})
export class DeliveryInvoiceModule {}
