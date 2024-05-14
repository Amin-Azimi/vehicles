import { Body, Controller, Get, Param, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { FindVehicleDto } from './dto/find-vehicle.dto';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) payload: FindVehicleDto) {
    return this.vehiclesService.findVehicleStateAtTimestamp(id, payload.timestamp);
  }
}
