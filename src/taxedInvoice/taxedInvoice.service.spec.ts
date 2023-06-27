import { Test, TestingModule } from '@nestjs/testing';
import { TaxedInvoiceService } from './taxedInvoice.service';

describe('TaxedInvoiceService', () => {
  let service: TaxedInvoiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaxedInvoiceService],
    }).compile();

    service = module.get<TaxedInvoiceService>(TaxedInvoiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
