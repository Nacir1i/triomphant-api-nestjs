import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceCategoryController } from './invoiceCategory.controller';
import { InvoiceCategoryService } from './invoiceCategory.service';

describe('InvoiceCategoryController', () => {
  let controller: InvoiceCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoiceCategoryController],
      providers: [InvoiceCategoryService],
    }).compile();

    controller = module.get<InvoiceCategoryController>(
      InvoiceCategoryController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
