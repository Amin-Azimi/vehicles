import { Body, Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { FindVehicleDto } from './dto/find-vehicle.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Vehicle } from './vehicle.entity';

@Controller('vehicles')
@ApiTags('Vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @ApiResponse({
    description: 'The vehicle state at the given timestamp',
    status: 200,
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        make: { type: 'string' },
        model: { type: 'string' },
        state: { type: 'string' },
      },
    },
  })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @Body() payload: FindVehicleDto): Promise<Vehicle>{
    return this.vehiclesService.findVehicleStateAtTimestamp(id, payload.timestamp);
  }
}
