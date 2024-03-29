import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseIsoDatePipe implements PipeTransform<string, string> {
  private readonly regexPattern: RegExp;

  constructor() {
    this.regexPattern = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/;
  }

  transform(value: string): string {
    if (value != null && !this.regexPattern.test(value)) {
      throw new BadRequestException(
        'Validation failed (valid date string is expected)',
      );
    }
    return value;
  }
}
