import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import {
  UpdateProductCollectionDto,
  UpdateServiceCollectionDto,
  UpdateMaterialCollectionDto,
} from 'src/utils/common';
import { PackageDto } from './package.dto';

export class UpdatePackageDto extends PartialType(PackageDto) {
  @ApiProperty()
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateProductCollectionDto)
  readonly updateProducts: UpdateProductCollectionDto[];

  @ApiProperty()
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateServiceCollectionDto)
  readonly updateService: UpdateServiceCollectionDto[];

  @ApiProperty()
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateMaterialCollectionDto)
  readonly updateMaterials: UpdateMaterialCollectionDto[];
}
