import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { CreateNotificationListener } from './listeners';

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService, CreateNotificationListener],
})
export class NotificationsModule {}
