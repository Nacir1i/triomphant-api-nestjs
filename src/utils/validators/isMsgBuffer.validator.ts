import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import * as msgpack from 'msgpack-lite';

export const IS_MSG_BUFFER = 'IsMsgBuffer';

export function isMsgBuffer(value: any): boolean {
  try {
    const decodedData = msgpack.decode(value);
    if (typeof decodedData != 'object') {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Checks if value is a Buffer
 */
export function IsMsgBuffer(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: IS_MSG_BUFFER,
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return isMsgBuffer(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid Buffer`;
        },
      },
    });
  };
}
