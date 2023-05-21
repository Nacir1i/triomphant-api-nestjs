import { ApiProperty, PartialType } from '@nestjs/swagger';
import { ValidateNested, IsOptional, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import {
  GenericObjectDto,
  ProductObjectDto,
  ServiceObjectDto,
  UpdateManualContentDto,
} from '../../utils/common';
import { PackageDto } from './package.dto';

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
  readonly delete: { product_id: number; package_id: number }[];
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
  readonly delete: { service_id: number; package_id: number }[];
}

export class UpdatePackageDto extends PartialType(PackageDto) {
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
}
