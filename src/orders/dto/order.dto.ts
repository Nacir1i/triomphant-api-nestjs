import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsNumber,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  ProductObjectDto,
  ServiceObjectDto,
  ManualOrderContentDto,
  CostModifierDto,
  PackageObjectDto,
} from '../../utils/common';

export class OrderDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly ref: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly paid: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly note: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly delivery_address: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly due_date: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly status: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly customer_id: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly quote_id: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly category_id: number;

  @ApiProperty()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CostModifierDto)
  readonly cost_modifier: CostModifierDto;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ProductObjectDto)
  readonly products: ProductObjectDto[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ServiceObjectDto)
  readonly services: ServiceObjectDto[];

  @ApiProperty()
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => PackageObjectDto)
  readonly packages: PackageObjectDto[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ManualOrderContentDto)
  readonly manualContent: ManualOrderContentDto[];
}
