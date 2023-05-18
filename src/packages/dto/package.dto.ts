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
  ManualPackageContentDto,
} from '../../utils/common';

export class PackageDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly description: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly categoryId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

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
  @Type(() => ManualPackageContentDto)
  readonly manualContent: ManualPackageContentDto[];
}
