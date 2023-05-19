import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryInvoiceService } from './deliveryInvoice.service';

describe('DeliveryInvoiceService', () => {
  let service: DeliveryInvoiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeliveryInvoiceService],
    }).compile();

    service = module.get<DeliveryInvoiceService>(DeliveryInvoiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
