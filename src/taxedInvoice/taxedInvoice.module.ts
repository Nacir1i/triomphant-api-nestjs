import { Module } from '@nestjs/common';
import { TaxedInvoiceService } from './taxedInvoice.service';
import { TaxedInvoiceController } from './taxedInvoice.controller';

@Module({
  controllers: [TaxedInvoiceController],
  providers: [TaxedInvoiceService],
})
export class TaxedInvoiceModule {}
