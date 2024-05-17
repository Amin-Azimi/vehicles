import { Test, TestingModule } from '@nestjs/testing';
import { StateLogsService } from '../state-logs.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StateLog } from '../state-log.entity';
import { Logger } from '@nestjs/common';
import { mockStateLog, mockTimestamp, mockVehicle } from './stubs';

describe('StateLogsService', () => {
  let service: StateLogsService;
  let repository: Repository<StateLog>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StateLogsService,
        {
          provide: Logger,
          useValue: {
            log: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(StateLog),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<StateLogsService>(StateLogsService);
    repository = module.get<Repository<StateLog>>(getRepositoryToken(StateLog));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findStateAtTimestamp', () => {
    it('should return state at timestamp', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([mockStateLog]);

      const result = await service.findStateAtTimestamp(mockVehicle.id, new Date(mockTimestamp));

      expect(result).toEqual(mockStateLog);
    });

    it('should return undefined if state not found', async () => {
      // Arrange
      jest.spyOn(repository, 'find').mockResolvedValue([]);

      // Act
      const result = await service.findStateAtTimestamp(mockVehicle.id, new Date(mockTimestamp));

      // Assert
      expect(result).toBeUndefined();
    });
  });
});
