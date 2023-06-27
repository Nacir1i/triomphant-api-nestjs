import { Test, TestingModule } from '@nestjs/testing';
import { TaxedInvoiceController } from './taxedInvoice.controller';
import { TaxedInvoiceService } from './taxedInvoice.service';

describe('TaxedInvoiceController', () => {
  let controller: TaxedInvoiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaxedInvoiceController],
      providers: [TaxedInvoiceService],
    }).compile();

    controller = module.get<TaxedInvoiceController>(TaxedInvoiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
