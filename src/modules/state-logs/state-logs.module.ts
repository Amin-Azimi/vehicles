import { Logger, Module } from '@nestjs/common';
import { StateLogsService } from './state-logs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateLog } from './state-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StateLog])],
  providers: [ StateLogsService,Logger],
  exports: [StateLogsService,Logger],
})
export class StateLogsModule {}
