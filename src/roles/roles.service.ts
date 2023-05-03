import { Injectable } from '@nestjs/common';
import { RoleDto, PartialTypedRoleDto } from './dto';

@Injectable()
export class RolesService {
  create(createRoleDto: RoleDto) {
    return 'This action adds a new role';
  }

  findAll() {
    return `This action returns all roles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: PartialTypedRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
