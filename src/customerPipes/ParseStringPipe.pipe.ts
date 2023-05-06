import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class PipeStringPipe implements PipeTransform<string, string> {
  transform(value: string): string {
    if (typeof value !== 'string') {
      throw new BadRequestException(
        'Invalid parameter: parameter must be a string',
      );
    }

    return value;
  }
}
