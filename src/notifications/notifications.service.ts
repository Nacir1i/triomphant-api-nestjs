import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationDto } from './dto';
import { notification } from '@prisma/client';

interface RolesInterface {
  role_id: number;
}
interface UsersInterface {
  user_id: number;
}

@Injectable()
export class NotificationsService {
  private readonly WEEK_DURATION_MS: number = 7 * 24 * 60 * 60 * 1000;

  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: NotificationDto): Promise<notification> {
    const users: UsersInterface[] | undefined = dto.users.map(
      (user: number) => ({ user_id: user }),
    );
    const roles: RolesInterface[] | undefined = dto.roles.map(
      (role: number) => ({ role_id: role }),
    );

    return await this.prismaService.notification.create({
      data: {
        type: dto.type,
        metadata: dto.metadata,

        employees: {
          create: users,
        },
        roles: {
          create: roles,
        },
      },
    });
  }

  async findAll(): Promise<notification[] | []> {
    return await this.prismaService.notification.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async findRelated(
    roleId: number,
    userId: number,
  ): Promise<notification[] | []> {
    return await this.prismaService.notification.findMany({
      where: {
        OR: [
          {
            roles: {
              some: {
                role_id: roleId,
              },
            },
          },
          {
            employees: {
              some: {
                user_id: userId,
              },
            },
          },
        ],
        AND: {
          is_read: false,
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async findRecent(): Promise<notification[] | []> {
    const prevWeekDate = new Date(new Date().getTime() - this.WEEK_DURATION_MS);

    return await this.prismaService.notification.findMany({
      where: {
        AND: [
          {
            created_at: {
              gt: prevWeekDate,
            },
          },
          {
            is_read: false,
          },
        ],
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }
}
