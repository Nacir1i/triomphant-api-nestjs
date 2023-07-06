import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsNumber,
  IsArray,
  ValidateNested,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IsMsgBuffer } from '../validators';

export class BaseObjectDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly quantity: number;
}

class BaseManualContentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly quantity: number;
}

export class GenericObjectDto extends BaseObjectDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly id: number;
}

export class ProductObjectDto extends BaseObjectDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly product_id: number;
}

export class ServiceObjectDto extends BaseObjectDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly service_id: number;
}

export class PackageObjectDto extends BaseObjectDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly package_id: number;
}

export class ManualPackageContentDto extends BaseManualContentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly package_id: number;
}

export class ManualQuoteContentDto extends BaseManualContentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly quote_id: number;
}

export class ManualOrderContentDto extends BaseManualContentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly order_id: number;
}

export class MaterialObjectDto extends BaseManualContentDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly material_id: number;
}

export class UpdateManualContentDto {
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => MaterialObjectDto)
  readonly add: MaterialObjectDto[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GenericObjectDto)
  readonly update: GenericObjectDto[];

  @IsArray()
  @IsOptional()
  readonly delete: { id: number; package_id: number }[];
}

export class UpdateMaterialCollectionDto {
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => MaterialObjectDto)
  readonly add: MaterialObjectDto[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => MaterialObjectDto)
  readonly update: MaterialObjectDto[];

  @IsArray()
  @IsOptional()
  readonly delete: number[];
}

export class CostModifierDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly shipping: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly discount: number;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  readonly is_discount_percentage: boolean;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly tax: number;
}

export function constructUpdateMany(array: GenericObjectDto[], name: string) {
  return array.map((field: GenericObjectDto) => {
    const query = {
      where: {
        [name]: field.id,
      },
      data: { quantity: field.quantity },
    };

    return query;
  });
}

export class BaseComment {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @ApiProperty()
  @IsMsgBuffer()
  @IsNotEmpty()
  readonly metadata: number[];

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  readonly is_system: boolean;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly commenter_id: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly notification_id: number;
}

export class BaseCommentNote {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly notification_id: number;
}
