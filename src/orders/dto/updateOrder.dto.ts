import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { OrderDto } from './order.dto';
import { Type } from 'class-transformer';
import {
  GenericObjectDto,
  PackageObjectDto,
  UpdateManualContentDto,
  ProductObjectDto,
  ServiceObjectDto,
} from '../../utils/common';

class UpdatePackageCollectionDto {
  @ApiProperty()
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => PackageObjectDto)
  readonly add: PackageObjectDto[];

  @ApiProperty()
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GenericObjectDto)
  readonly update: GenericObjectDto[];

  @ApiProperty()
  @IsArray()
  @IsOptional()
  readonly delete: { order_id: number; package_id: number }[];
}

class UpdateProductCollectionDto {
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ProductObjectDto)
  readonly add: ProductObjectDto[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GenericObjectDto)
  readonly update: GenericObjectDto[];

  @IsArray()
  @IsOptional()
  readonly delete: { product_id: number; order_id: number }[];
}

class UpdateServiceCollectionDto {
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ServiceObjectDto)
  readonly add: ServiceObjectDto[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GenericObjectDto)
  readonly update: GenericObjectDto[];

  @IsArray()
  @IsOptional()
  readonly delete: { service_id: number; order_id: number }[];
}

export class UpdateOrderDto extends PartialType(OrderDto) {
  @ApiProperty()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateProductCollectionDto)
  readonly updateProducts: UpdateProductCollectionDto;

  @ApiProperty()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateServiceCollectionDto)
  readonly updateServices: UpdateServiceCollectionDto;

  @ApiProperty()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateManualContentDto)
  readonly updateManualContent: UpdateManualContentDto;

  @ApiProperty()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdatePackageCollectionDto)
  readonly updatePackage: UpdatePackageCollectionDto;
}
