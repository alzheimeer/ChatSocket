import { IsString, IsNotEmpty } from 'class-validator';

export class ChatMessageDto {
  @IsString()
  @IsNotEmpty()
  recipientAlias: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
