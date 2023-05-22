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

export class MaterialsDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly remaining: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly quantity: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly material_id: number;
}

export class EmployeesDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly user_id: number;
}

export class DeliveryInvoiceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly note: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly status: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly order_id: number;

  @ApiProperty()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => EmployeesDto)
  readonly employees: EmployeesDto;

  @ApiProperty()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => MaterialsDto)
  readonly materials: MaterialsDto;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ManualOrderContentDto)
  readonly manualContent: ManualOrderContentDto[];
}
