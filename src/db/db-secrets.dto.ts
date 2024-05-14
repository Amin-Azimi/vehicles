import { IsNotEmpty } from 'class-validator';
import 'dotenv/config';

export class DbSecretDto {
  @IsNotEmpty()
  HOST: string;

  @IsNotEmpty()
  PORT: string;

  @IsNotEmpty()
  PASSWORD: string;

  @IsNotEmpty()
  DB_USER: string;

  @IsNotEmpty()
  DB_NAME: string;
}
