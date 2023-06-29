import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationDto } from '../dto';
import { NotificationsService } from '../notifications.service';

@Injectable()
export class CreateNotificationListener {
  constructor(private readonly notificationService: NotificationsService) {}

  @OnEvent('notification.create')
  async handleCreateNotificationEvent(notification: NotificationDto) {
    await this.notificationService.create(notification);

    console.log('notification created successfully');
  }
}
