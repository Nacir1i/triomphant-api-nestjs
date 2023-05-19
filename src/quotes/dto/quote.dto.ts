import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsNumber,
  IsArray,
  ValidateNested,
} from 'class-validator';
import {
  CostModifierDto,
  GenericObjectDto,
  ManualPackageContentDto,
  PackageContentDto,
  ProductObjectDto,
  ServiceObjectDto,
} from '../../utils/common';

export class QuoteDto {
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
  readonly note: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly due_date: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly address: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly status: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly customerId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly categoryId: number;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CostModifierDto)
  readonly costModifier: CostModifierDto[];

  @ApiProperty()
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ProductObjectDto)
  readonly products: ProductObjectDto[];

  @ApiProperty()
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ServiceObjectDto)
  readonly services: ServiceObjectDto[];

  @ApiProperty()
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => PackageContentDto)
  readonly packageContent: PackageContentDto[];
}