import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { WebsocketService } from './websocket.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class WebsocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  private readonly server: Server;

  constructor(private readonly websocketService: WebsocketService) {}

  handleDisconnect(client: Socket) {
    console.log(`client ${client.id} disconnected`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`client ${client.id} connected`);
  }

  afterInit(server: Server) {
    // console.log(server);
  }

  @SubscribeMessage('test')
  test(@MessageBody() body: any) {
    console.log(body);
  }
}
