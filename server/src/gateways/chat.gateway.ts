import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger, UseGuards } from '@nestjs/common';
import { ChatService } from '../services/chat.service';
import { JwtAuthGuard } from '../guards/auth.guard';

@WebSocketGateway()
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  constructor(
    private readonly chatService: ChatService,
  ) {}

  private logger: Logger = new Logger('MessageGateway');
  @WebSocketServer() wss: Server;
  server: Server;

  afterInit(server: Server) {
    this.logger.log('Initialized');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client Connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client Disconnected: ${client.id}`);
  }


  @UseGuards(JwtAuthGuard)
  @SubscribeMessage('receiveMessageToChat')
  async handleReceiveMessageToChat(
    @MessageBody('id') id: string,
    @ConnectedSocket() socket: Socket,
  ) {
    try {
      const data = await this.chatService.getChatById(id)
      socket.emit('receiveMessageToChat', data);
    } catch (error) {
      socket.emit('receiveMessageToChat', { error: error.message });
    }
  }
}
