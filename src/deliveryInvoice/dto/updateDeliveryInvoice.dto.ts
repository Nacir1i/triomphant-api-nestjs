import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import {
  DeliveryInvoiceDto,
  MaterialsDto,
  EmployeesDto,
} from './deliveryInvoice.dto';
import { Type } from 'class-transformer';
import { GenericObjectDto, UpdateManualContentDto } from '../../utils/common';

class UpdateMaterialDto {
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => MaterialsDto)
  readonly add: MaterialsDto[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GenericObjectDto)
  readonly update: GenericObjectDto[];

  @IsArray()
  @IsOptional()
  readonly delete: { delivery_invoice_id: number; material_id: number }[];
}

class UpdateEmployeeDto {
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => EmployeesDto)
  readonly add: EmployeesDto[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GenericObjectDto)
  readonly update: GenericObjectDto[];

  @IsArray()
  @IsOptional()
  readonly delete: { delivery_invoice_id: number; user_id: number }[];
}

export class UpdateDeliveryInvoiceDto extends PartialType(DeliveryInvoiceDto) {
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateMaterialDto)
  readonly updateMaterial: UpdateMaterialDto;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateEmployeeDto)
  readonly updateEmployee: UpdateEmployeeDto;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateManualContentDto)
  readonly updateManualContent: UpdateManualContentDto;
}
