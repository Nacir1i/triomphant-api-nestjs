import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty, IsNumber } from 'class-validator';

export class MaterialDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly description: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly quantity: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly quantity_threshold: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly category_id: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly location_id: number;
}
