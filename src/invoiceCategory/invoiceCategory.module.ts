import { Module } from '@nestjs/common';
import { InvoiceCategoryService } from './invoiceCategory.service';
import { InvoiceCategoryController } from './invoiceCategory.controller';

@Module({
  controllers: [InvoiceCategoryController],
  providers: [InvoiceCategoryService],
})
export class InvoiceCategoryModule {}
