
import { IsDateString } from 'class-validator';

export class FindVehicleDto {
  @IsDateString()
  timestamp: string;
}
