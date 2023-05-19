import { Module } from '@nestjs/common';
import { DeliveryInvoiceService } from './deliveryInvoice.service';
import { DeliveryInvoiceController } from './deliveryInvoice.controller';

@Module({
  controllers: [DeliveryInvoiceController],
  providers: [DeliveryInvoiceService],
})
export class DeliveryInvoiceModule {}
