import { Controller } from '@nestjs/common';
import { DeliveryInvoiceService } from './delivery-invoice.service';

@Controller('delivery-invoice')
export class DeliveryInvoiceController {
  constructor(private readonly deliveryInvoiceService: DeliveryInvoiceService) {}
}
