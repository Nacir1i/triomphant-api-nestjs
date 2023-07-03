import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty, IsNumber } from 'class-validator';

export class CustomerCommentNoteDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly comment_id: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly notification_id: number;
}
