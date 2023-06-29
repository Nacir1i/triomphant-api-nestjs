import { PartialType } from '@nestjs/swagger';
import { ChargeDto } from './index';

export class UpdateChargeDto extends PartialType(ChargeDto) {}
