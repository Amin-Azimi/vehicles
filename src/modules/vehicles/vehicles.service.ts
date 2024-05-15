import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Vehicle } from "./vehicle.entity";
import { StateLogsService } from "../state-logs/state-logs.service";

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehiclesRepository: Repository<Vehicle>,
    private readonly stateLogsService: StateLogsService,
    private readonly logger: Logger
  ) {}

  public async findVehicleStateAtTimestamp(id: number, timestamp: string) {
    this.logger.log(
      `Finding vehicle state at timestamp ${timestamp} for vehicle ${id}`
    );
    const vehicle = await this.findAndValidateVehicle(id);

    try {
      const stateLog = await this.findStateLogAtTimestamp(
        vehicle.id,
        timestamp
      );
      this.logger.log(
        `Found state ${stateLog ? stateLog.state : null} for vehicle ${id} at timestamp ${timestamp}`
      );

      return {
        vehicleId: vehicle.id,
        state: stateLog ? stateLog.state : null,
        timestamp: stateLog ? stateLog.timestamp : null,
      };
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
      throw new NotFoundException({
        message: `Vehicle not found with id ${id}`,
        status: HttpStatus.NOT_FOUND,
      });
    }

    return vehicle;
  }

  private async findStateLogAtTimestamp(vehicleId: number, timestamp: string) {
    return this.stateLogsService.findStateAtTimestamp(
      vehicleId,
      new Date(timestamp)
    );
  }
}
