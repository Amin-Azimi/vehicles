// config.dto.ts
import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class ConfigDto {
  @IsString()
  @IsNotEmpty()
  DB_HOST: string;

  @IsInt()
  @IsNotEmpty()
  DB_PORT: number;

  @IsString()
  @IsNotEmpty()
  DB_USER : string;

  @IsString()
  @IsNotEmpty()
  DB_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  DB_NAME: string;
}
