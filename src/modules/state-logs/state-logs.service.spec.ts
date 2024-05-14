import { Test, TestingModule } from '@nestjs/testing';
import { StateLogsService } from './state-logs.service';

describe('StateLogsService', () => {
  let service: StateLogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StateLogsService],
    }).compile();

    service = module.get<StateLogsService>(StateLogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
