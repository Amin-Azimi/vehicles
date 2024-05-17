import { MiddlewareConsumer, Module } from '@nestjs/common';
import { VehiclesModule } from './modules/vehicles/vehicles.module';
import { ConfigModule } from '@nestjs/config';
import { ConfigDto } from './shared/config.dto';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './ormconfig';
import { envDtoValidator } from './shared/env-validator';
import { StateLogsModule } from './modules/state-logs/state-logs.module';
import { RateLimiterMiddleware } from './shared/rate-limiter.middleware';

@Module({
  imports: [
    VehiclesModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validate: envDtoValidator(ConfigDto),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => typeOrmConfig(),
    }),
    StateLogsModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RateLimiterMiddleware).forRoutes('*'); // Apply RateLimiterMiddleware to all routes
  }
}
