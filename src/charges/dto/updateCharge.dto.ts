import { PartialType } from '@nestjs/swagger';
import { ChargeDto } from './index';

export class UpdateAppointmentDto extends PartialType(ChargeDto) {}
