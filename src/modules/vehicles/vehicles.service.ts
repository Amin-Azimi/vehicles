import { HttpStatus, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
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
    private readonly logger: Logger
  ) {}

  public async findVehicleStateAtTimestamp(id: number, timestamp: string):Promise<Vehicle> {
    this.logger.log(`Finding vehicle state at timestamp ${timestamp} for vehicle ${id}`);

    try {
      const vehicle = await this.findAndValidateVehicle(id);
      const stateLog = await this.findStateLogAtTimestamp(vehicle.id, timestamp);

      vehicle.state = stateLog?.state ?? null;
      this.logger.log(`Found state ${stateLog ? stateLog.state : null} for vehicle ${id} at timestamp ${timestamp}`);

      return vehicle;
    } catch (error) {
      this.logger.error(error.message);

      throw new InternalServerErrorException({
        message: `Error finding state at timestamp ${timestamp} for vehicle ${id}`,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  private async findAndValidateVehicle(id: number) {
    const vehicle = await this.vehiclesRepository.findOne({ where: { id } });
    if (!vehicle) {
      this.logger.error(`Vehicle not found with id ${id}`);

      throw new NotFoundException({
        message: `Vehicle not found with id ${id}`,
        status: HttpStatus.NOT_FOUND,
      });
    }

    return vehicle;
  }

  private async findStateLogAtTimestamp(vehicleId: number, timestamp: string) {
    return this.stateLogsService.findStateAtTimestamp(vehicleId, new Date(timestamp));
  }
}
