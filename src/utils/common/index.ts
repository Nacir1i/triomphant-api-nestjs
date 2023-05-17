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

export class MaterialObjectDto extends BaseObjectDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly material_id: number;
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
  @Type(() => ProductObjectDto)
  readonly update: ProductObjectDto[];

  @IsArray()
  @IsOptional()
  readonly delete: number[];
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
  @Type(() => ServiceObjectDto)
  readonly update: ServiceObjectDto[];

  @IsArray()
  @IsOptional()
  readonly delete: number[];
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
