import { IsString, IsNotEmpty } from 'class-validator';

export class BroadcastMessageDto {
  @IsString()
  @IsNotEmpty()
  message: string;
}
