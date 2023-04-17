import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async login(): Promise<object> {
    return { message: 'test' };
  }

  async signup(): Promise<object> {
    return { message: 'test' };
  }
}
