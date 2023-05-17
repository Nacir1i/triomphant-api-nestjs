import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { ServiceDto } from './service.dto';

export class UpdateServiceDTO extends PartialType(ServiceDto) {}
