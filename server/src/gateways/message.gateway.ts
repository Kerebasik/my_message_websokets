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
import { CreateMessageInput } from '../inputs/create-message.input';
import { JwtAuthGuard } from '../guards/auth.guard';
import { TokenService } from '../services/token.service';
import { MessageService } from '../services/message.service';

@WebSocketGateway()
export class MessageGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  constructor(
    private readonly messageService: MessageService,
    private readonly tokenService: TokenService,
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
  @SubscribeMessage('sendMessageToChat')
  async handleSendMessageToChat(
    @MessageBody() input: CreateMessageInput,
    @ConnectedSocket() socket: Socket,
  ) {
    try {
      const payload = this.tokenService.decodeToken(
        socket.handshake.headers.authorization,
      );
      const message = await this.messageService.sendMessageToChat(
        input,
        payload.sub,
      );
      socket.emit('sendMessageToChat', message);
    } catch (error) {
      socket.emit('sendMessageToChat', { error: error.message });
    }
  }
}
