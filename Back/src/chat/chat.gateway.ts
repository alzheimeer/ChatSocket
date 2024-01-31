import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatMessageDto } from './dto/chat-message.dto';
import { BroadcastMessageDto } from './dto/broadcast-message.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private usersService: UsersService) {}

  @SubscribeMessage('connectUser')
  handleUserConnection(
    @MessageBody() loginDto: LoginDto,
    @ConnectedSocket() client: Socket,
  ) {
    const alias = loginDto.alias;
    console.log('Usuario Enviado: ', alias);
    // Verificar si el alias es válido y no está en uso
    if (!this.usersService.isValidAlias(alias)) {
      console.log('Alias inválido: solo se permiten letras y números');
      client.emit('error', 'Alias inválido: solo se permiten letras y números');
      // client.disconnect();
      return;
    }

    if (this.usersService.isAliasInUse(alias)) {
      console.log('Alias ya en uso');
      client.emit('error', 'Alias ya en uso');
      // client.disconnect();
      return;
    }
    // Añadir usuario y notificar a todos los usuarios
    this.usersService.addUser(alias, client);
    client.data.alias = alias; // Almacenar alias en el socket
    client.emit('connectionSuccess', { message: 'Conectado exitosamente.' });
    this.updateConnectedUsersList();
  }

  updateConnectedUsersList() {
    const connectedUsers = this.usersService.getAllUsers();
    this.server.emit('usersList', connectedUsers);
  }

  handleConnection(@ConnectedSocket() client: Socket) {
    // Preparar el socket para la identificación, pero no realizar acciones hasta recibir el mensaje 'connectUser'
    console.log(`Cliente conectado, esperando identificación: ${client.id}`);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    const alias = client.data.alias; // Recuperar alias del socket
    if (alias) {
      this.usersService.removeUser(alias);
      console.log(`Cliente desconectado: ${alias}`);
      // Enviar un evento específico para notificar sobre el usuario desconectado
      this.server.emit('userDisconnected', alias);
      // Enviar la lista actualizada de usuarios conectados a todos los usuarios
      this.updateConnectedUsersList();
    } else {
      console.log(`Cliente desconectado: ${client.id}`);
    }
  }

  @SubscribeMessage('sendMessage')
  sendMessage(
    @ConnectedSocket() sender: Socket,
    @MessageBody() chatMessageDto: ChatMessageDto,
  ) {
    const senderAlias = sender.data.alias;
    // Verificar si el destinatario es el mismo que el remitente
    if (chatMessageDto.recipientAlias === senderAlias) {
      console.log('Un usuario intentó enviarse un mensaje a sí mismo.');
      sender.emit('error', 'No puedes enviarte mensajes a ti mismo.');
      return;
    }
    const recipientSocket = this.usersService.getUser(
      chatMessageDto.recipientAlias,
    );

    if (recipientSocket) {
      const timestamp = new Date().toLocaleString('en-US', {
        timeZone: 'America/Bogota',
      });
      const messageWithTimestamp = {
        ...chatMessageDto,
        senderAlias,
        timestamp,
      };

      // Enviar mensaje al destinatario
      recipientSocket.emit('privateMessage', messageWithTimestamp);
      // Enviar copia del mensaje al remitente
      sender.emit('privateMessage', messageWithTimestamp);
    } else {
      sender.emit('error', 'Destinatario no encontrado');
    }
  }

  @SubscribeMessage('sendMessageAll')
  sendMessageAll(
    @ConnectedSocket() sender: Socket,
    @MessageBody() broadcastMessageDto: BroadcastMessageDto,
  ) {
    const senderAlias = sender.data.alias;
    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'America/Bogota',
    });
    const messageWithTimestamp = {
      ...broadcastMessageDto,
      senderAlias,
      timestamp,
    };

    // Enviar mensaje a todos los usuarios conectados
    this.server.emit('messageFromServerToAll', messageWithTimestamp);
  }
}
