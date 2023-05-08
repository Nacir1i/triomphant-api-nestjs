import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseStringPipe implements PipeTransform<string, string> {
  private readonly regexPattern: RegExp;

  constructor() {
    this.regexPattern = /^[A-Za-z]+$/;
  }

  transform(value: string): string {
    if (!this.regexPattern.test(value) || !value) {
      throw new BadRequestException('Validation failed (string is expected)');
    }
    return value;
  }
}
