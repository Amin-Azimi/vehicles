import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { StateLogsService } from '../state-logs/state-logs.service';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehiclesRepository: Repository<Vehicle>,
    private readonly stateLogsService: StateLogsService,
  ) {}

  async findVehicleStateAtTimestamp(id: number, timestamp: string) {
    const vehicle = await this.vehiclesRepository.findOne({where: {id}});
    if (!vehicle) {
      return { error: 'Vehicle not found' };
    }

    const stateLog = await this.findStateLogAtTimestamp(vehicle.id, timestamp);
    return { vehicleId:vehicle.id, state: stateLog ? stateLog.state : null,timestamp: stateLog ? stateLog.timestamp : null};
  }

  private async findStateLogAtTimestamp(vehicleId: number, timestamp: string) {
    return this.stateLogsService.findStateAtTimestamp(vehicleId, new Date(timestamp));
  }
}
