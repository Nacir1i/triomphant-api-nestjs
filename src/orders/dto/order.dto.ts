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
  readonly deliveryAddress: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly dueDate: string;

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
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CostModifierDto)
  readonly costModifier: CostModifierDto;

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

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ManualOrderContentDto)
  readonly manualContent: ManualOrderContentDto[];
}
