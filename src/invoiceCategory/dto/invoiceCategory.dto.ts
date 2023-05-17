import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class InvoiceCategoryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly title: string;
}
