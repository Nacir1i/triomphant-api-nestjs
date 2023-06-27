import { Controller } from '@nestjs/common';
import { TaxedInvoiceService } from './taxedInvoice.service';

@Controller('taxed-invoice')
export class TaxedInvoiceController {
  constructor(private readonly taxedInvoiceService: TaxedInvoiceService) {}
}
