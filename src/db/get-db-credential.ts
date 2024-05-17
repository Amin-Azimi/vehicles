import { AwsSecret } from '../shared/aws/aws.secret';
import { DbSecretDto } from './db-secrets.dto';
import { getIsProduction } from '../shared/app.constants';

export const getDbCredentialsFromLocalConfigOrSecretManager = async (): Promise<DbSecretDto> => {
  if (!getIsProduction()) {
    return {
      HOST: process.env.DB_HOST,
      PORT: process.env.DB_PORT,
      DB_USER: process.env.DB_USER,
      PASSWORD: process.env.DB_PASSWORD,
      DB_NAME: process.env.DB_NAME,
    } as DbSecretDto;
  }
  const awsSecret = new AwsSecret({
    region: process.env['AWS_REGION'],
  });
  console.log(`Getting secrets for: ${getDbSecretName(process.env.DB_NAME)}`);
  return awsSecret.getSecret<DbSecretDto>(getDbSecretName(process.env.DB_NAME));
};

const getDbSecretName = (dbName: string) => `${process.env.DB_CONFIG_SECRET_PREFIX}/${dbName}`;
export const getDbName = (envName: string, defaultValue: string) => {
  try {
    return JSON.parse(process.env[envName]).db_name;
  } catch (e) {
    console.error('getDbName error: ', e);
    return defaultValue;
  }
};
