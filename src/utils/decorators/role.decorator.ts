import { SetMetadata } from '@nestjs/common';
import { RoleAccessLevel } from '../../auth/role.guard';

export const ROLE = 'role';
export const Role = (role: RoleAccessLevel) => SetMetadata(ROLE, role);
