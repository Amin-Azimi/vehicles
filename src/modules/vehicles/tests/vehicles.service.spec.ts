import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesService } from '../vehicles.service';
import { NotFoundException, InternalServerErrorException, Logger, HttpStatus } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from '../vehicle.entity';
import { StateLogsService } from '../../state-logs/state-logs.service';
import { mockStateLog, mockTimestamp, mockVehicle } from './stubs';

describe('VehiclesService', () => {
  let service: VehiclesService;
  let repository: Repository<Vehicle>;
  let stateLogsService: StateLogsService;
  let logger: Logger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehiclesService,
        {
          provide: StateLogsService,
          useValue: {
            findStateAtTimestamp: jest.fn(),
          },
        },
        {
          provide: Logger,
          useValue: {
            log: jest.fn(),
            error: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Vehicle),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<VehiclesService>(VehiclesService);
    repository = module.get<Repository<Vehicle>>(getRepositoryToken(Vehicle));
    stateLogsService = module.get<StateLogsService>(StateLogsService);
    logger = module.get<Logger>(Logger);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findVehicleStateAtTimestamp', () => {
    it('should return vehicle state at timestamp', async () => {
      // Arrange
      jest.spyOn(stateLogsService, 'findStateAtTimestamp').mockResolvedValue(mockStateLog);
      service['findAndValidateVehicle'] = jest.fn().mockResolvedValue(mockVehicle);

      // Act
      const result = await service.findVehicleStateAtTimestamp(mockVehicle.id, mockTimestamp);

      // Assert
      expect(service['findAndValidateVehicle']).toHaveBeenCalledWith(mockVehicle.id);
      expect(result).toEqual({
        ...mockVehicle,
        state: mockStateLog.state,
      });
    });

    it('should throw NotFoundException if vehicle not found', async () => {
      // Arrange
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      // Act & Assert
      await expect(service.findVehicleStateAtTimestamp(mockVehicle.id, mockTimestamp)).rejects.toThrow(
        new NotFoundException({
          message: `Vehicle not found with id ${mockVehicle.id}`,
          status: HttpStatus.NOT_FOUND,
        })
      );
    });

    it('should throw InternalServerErrorException if error occurs', async () => {
      // Arrange
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockVehicle);
      jest.spyOn(stateLogsService, 'findStateAtTimestamp').mockRejectedValue(new Error('Internal Server Error'));

      // Act & Assert
      await expect(service.findVehicleStateAtTimestamp(mockVehicle.id, mockTimestamp)).rejects.toThrow(
        new InternalServerErrorException({
          message: `Error finding state at timestamp ${mockTimestamp} for vehicle ${mockVehicle.id}`,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
        })
      );
    });
  });

  describe('findAndValidateVehicle', () => {
    it('should return vehicle if found', async () => {
      // Arrange
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockVehicle);

      // Act
      const result = await service['findAndValidateVehicle'](mockVehicle.id);

      // Assert
      expect(result).toEqual(mockVehicle);
    });

    it('should throw NotFoundException if vehicle not found', async () => {
      // Arrange
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      // Act & Assert
      await expect(service['findAndValidateVehicle'](mockVehicle.id)).rejects.toThrow(
        new NotFoundException({
          message: `Vehicle not found with id ${mockVehicle.id}`,
          status: HttpStatus.NOT_FOUND,
        })
      );
      expect(logger.error).toHaveBeenCalledWith(`Vehicle not found with id ${mockVehicle.id}`);
    });
  });
});
