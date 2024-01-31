import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  alias: string;
}
