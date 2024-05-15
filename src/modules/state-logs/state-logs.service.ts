import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StateLog } from './state-log.entity';
import { LessThanOrEqual, Repository } from 'typeorm';

@Injectable()
export class StateLogsService {
    constructor(
        @InjectRepository(StateLog)
        private readonly stateLogRepository: Repository<StateLog>,
        private readonly logger: Logger
      ) {}
    
    public async findStateAtTimestamp(vehicleId: number, timestamp: Date): Promise<StateLog> {
        const [result] = await this.stateLogRepository.find({where: {vehicleId, timestamp:LessThanOrEqual(timestamp) },order: {timestamp: 'DESC'},take: 1});
        this.logger.log(`Found state ${result ? result.state : null} for vehicle ${vehicleId} at timestamp ${timestamp}`);
        return result;
    }
}
