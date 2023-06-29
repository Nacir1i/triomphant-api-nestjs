import { Controller } from '@nestjs/common';
import { ChargesService } from './charges.service';

@Controller('charges')
export class ChargesController {
  constructor(private readonly chargesService: ChargesService) {}
}
