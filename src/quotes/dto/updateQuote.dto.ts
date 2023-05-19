import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { QuoteDto } from './quote.dto';
import { Type } from 'class-transformer';
import {
  GenericObjectDto,
  PackageContentDto,
  UpdateServiceCollectionDto,
  UpdateProductCollectionDto,
  UpdateManualContentDto,
} from '../../utils/common';

export class UpdateQuoteDto extends PartialType(QuoteDto) {
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
  readonly updatePackageContent: UpdatePackageCollectionDto;
}

export class UpdatePackageCollectionDto {
  @ApiProperty()
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => PackageContentDto)
  readonly add: PackageContentDto[];

  @ApiProperty()
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GenericObjectDto)
  readonly update: GenericObjectDto[];

  @ApiProperty()
  @IsArray()
  @IsOptional()
  readonly delete: { quote_id: number; package_id: number }[];
}
