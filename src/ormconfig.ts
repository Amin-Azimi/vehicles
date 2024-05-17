import { getIsProduction } from './shared/app.constants';
import { Vehicle } from './modules/vehicles/vehicle.entity';
import { getDbCredentialsFromLocalConfigOrSecretManager } from './db/get-db-credential';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as dotenv from 'dotenv';
import { StateLog } from './modules/state-logs/state-log.entity';
import { join } from 'path';

const entities = [Vehicle, StateLog];
export const typeOrmConfig = async (): Promise<PostgresConnectionOptions> => {
  dotenv.config();
  const secrets = await getDbCredentialsFromLocalConfigOrSecretManager();
  const migrationPath = join(__dirname, 'db', 'migrations', '**', '*{.ts,.js}');
  return {
    type: 'postgres',
    host: secrets.HOST,
    port: +secrets.PORT,
    username: secrets.DB_USER,
    password: secrets.PASSWORD,
    database: secrets.DB_NAME,
    synchronize: false,
    ssl: false,
    logging: !getIsProduction(),
    entities: [...entities],
    migrationsTableName: 'migrations',
    migrations: [migrationPath],
    extra: {
      cli: {
        migrationsDir: migrationPath,
      },
    },
  };
};
