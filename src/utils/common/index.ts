import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsEmail,
  IsNumber,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

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

export class ManualPackageContentDto extends BaseManualContentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly packageId: number;
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

export class UpdateProductCollectionDto {
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

export class UpdateServiceCollectionDto {
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

export function constructUpdateMany(array: GenericObjectDto[], name: string) {
  return array.map((field: GenericObjectDto) => {
    const query = {
      where: {},
      data: { quantity: field.quantity },
    };

    query.where[name] = field.id;

    return query;
  });
}
