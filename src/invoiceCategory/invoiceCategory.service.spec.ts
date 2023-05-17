import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceCategoryService } from './invoiceCategory.service';

describe('InvoiceCategoryService', () => {
  let service: InvoiceCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvoiceCategoryService],
    }).compile();

    service = module.get<InvoiceCategoryService>(InvoiceCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
