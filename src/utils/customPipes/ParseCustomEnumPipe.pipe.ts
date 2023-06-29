import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { isEnum } from 'class-validator';

@Injectable()
export class ParseCustomEnumPipe implements PipeTransform<string, string> {
  constructor(private readonly enumeration: any) {}

  transform(value: string): string {
    if (value != null && !isEnum(value, this.enumeration)) {
      throw new BadRequestException(
        `Validation failed (${value} is no a valid Enum: { ${Object.values(
          this.enumeration,
        ).join(', ')} })`,
      );
    }

    return value;
  }
}
