import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { BaseCommentNote } from 'src/utils/common';

export class CustomerCommentNoteDto extends BaseCommentNote {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly comment_id: number;
}
