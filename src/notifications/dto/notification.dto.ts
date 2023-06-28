import { IsString, IsOptional, IsBoolean, IsNotEmpty } from 'class-validator';

export class NotificationDto {
  @IsString()
  @IsOptional()
  readonly type: string;

  @IsBoolean()
  @IsOptional()
  readonly is_read: boolean;

  @IsBoolean()
  @IsNotEmpty()
  readonly metadata: Buffer;

  @IsBoolean()
  @IsNotEmpty()
  readonly roles: Array<number>;

  @IsBoolean()
  @IsNotEmpty()
  readonly users: Array<number>;
}
