import { ApiProperty } from '@nestjs/swagger';
import { charge_state, frequency } from '@prisma/client';
import { IsString, IsOptional, IsNotEmpty, IsNumber } from 'class-validator';

export interface ChargePayment {
  title: string;
  paid_at: Date;
  amount: number;
  method: string;
}

export class ChargeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly type: charge_state;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly state: charge_state;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly frequency: frequency;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly payments: ChargePayment[];

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly vendor_id: number;
}
