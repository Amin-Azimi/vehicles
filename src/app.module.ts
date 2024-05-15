import { Module } from "@nestjs/common";
import { VehiclesModule } from "./modules/vehicles/vehicles.module";
import { ConfigModule } from "@nestjs/config";
import { ConfigDto } from "./shared/config.dto";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "./ormconfig";
import { envDtoValidator } from "./shared/env-validator";
import { StateLogsModule } from './modules/state-logs/state-logs.module';
import { AppExceptionFilter } from "./shared/app-exception.filter";

@Module({
  imports: [
    VehiclesModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validate: envDtoValidator(ConfigDto),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        typeOrmConfig(),
    }),
    StateLogsModule,
  ],
})
export class AppModule {}
