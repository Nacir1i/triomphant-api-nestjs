import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryInvoiceController } from './delivery-invoice.controller';
import { DeliveryInvoiceService } from './delivery-invoice.service';

describe('DeliveryInvoiceController', () => {
  let controller: DeliveryInvoiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliveryInvoiceController],
      providers: [DeliveryInvoiceService],
    }).compile();

    controller = module.get<DeliveryInvoiceController>(DeliveryInvoiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
