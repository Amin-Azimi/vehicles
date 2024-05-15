
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

export class FindVehicleDto {
  @ApiProperty({example: '2022-09-12 10:00:00+00'})
  @IsDateString()
  timestamp: string;
}
