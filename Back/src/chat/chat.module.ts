import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { UsersService } from 'src/users/users.service';

@Module({
  providers: [ChatGateway, UsersService],
})
export class ChatModule {}
