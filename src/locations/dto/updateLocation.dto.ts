import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { LocationDto } from './location.dto';

export class UpdateLocationDto extends PartialType(LocationDto) {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly id: number;
}
