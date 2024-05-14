import { Module } from '@nestjs/common';
import { StateLogsService } from './state-logs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateLog } from './state-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StateLog])],
  providers: [ StateLogsService],
  exports: [StateLogsService],
})
export class StateLogsModule {}
