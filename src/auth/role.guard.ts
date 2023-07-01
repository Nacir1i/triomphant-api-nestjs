import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE } from '../utils/decorators';

export enum RoleAccessLevel {
  DEV = 1,
  OWNER,
  ASSISTANT,
  AGENT_STOCK,
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.getAllAndOverride<RoleAccessLevel>(ROLE, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!role) return true;

    const { user } = context.switchToHttp().getRequest();
    console.log('user', user);

    if (!user) throw new ForbiddenException('No user object was provided');
    if (user.role.id > role)
      throw new ForbiddenException(
        'User is not permitted to access this resource',
      );

    return true;
  }
}
