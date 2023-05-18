import { ApiProperty, PartialType } from '@nestjs/swagger';
import { ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import {
  UpdateProductCollectionDto,
  UpdateServiceCollectionDto,
  UpdateManualContentDto,
} from 'src/utils/common';
import { PackageDto } from './package.dto';

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
