import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserService } from '../user/user.service';
import { user } from '@prisma/client';
import * as argon from 'argon2';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../utils/decorators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      console.log('no token');

      throw new UnauthorizedException();
    }

    try {
      const claimedUser: user = await this.jwtService.verifyAsync(token);

      const user = await this.userService.findByUserName(claimedUser.username);
      console.log('claimed password', claimedUser.password);
      console.log('user password', user.password);

      if (!user) {
        console.log('no user');
        throw new UnauthorizedException();
      }

      if (user.password !== claimedUser.password) {
        console.log('no password');
        throw new UnauthorizedException();
      }

      request['user'] = claimedUser;
    } catch (error) {
      console.log(error);

      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
