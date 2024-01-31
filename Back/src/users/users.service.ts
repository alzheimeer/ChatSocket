import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class UsersService {
  private connectedUsers = new Map<string, Socket>(); // Mapa de usuarios conectados

  isValidAlias(alias: string): boolean {
    const regex = /^[A-Za-z0-9]+$/; // Solo letras y números
    return regex.test(alias);
  }

  isAliasInUse(alias: string): boolean {
    return this.connectedUsers.has(alias);
  }

  addUser(alias: string, client: Socket) {
    this.connectedUsers.set(alias, client);
  }

  removeUser(alias: string) {
    this.connectedUsers.delete(alias);
  }

  getUser(alias: string): Socket | undefined {
    return this.connectedUsers.get(alias);
  }

  getAllUsers(): string[] {
    return Array.from(this.connectedUsers.keys());
  }
}
