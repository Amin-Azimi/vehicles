import { Body, Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { FindVehicleDto } from './dto/find-vehicle.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('vehicles')
@ApiTags('Vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @Body() payload: FindVehicleDto) {
    return this.vehiclesService.findVehicleStateAtTimestamp(id, payload.timestamp);
  }
}
