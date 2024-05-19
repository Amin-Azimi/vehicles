import { getDbCredentialsFromLocalConfigOrSecretManager, getDbName } from '../get-db-credential';
import { AwsSecret } from '../../shared/aws/aws.secret';

jest.mock('../../shared/aws/aws.secret', () => {
  return {
    AwsSecret: jest.fn().mockImplementation(() => {
      return {
        getSecret: jest.fn().mockResolvedValue({
          HOST: 'prod-host',
          PORT: 5432,
          DB_USER: 'prod-user',
          PASSWORD: 'prod-password',
          DB_NAME: 'prod-dbname',
        }),
      };
    }),
  };
});

describe('getDbCredentialsFromLocalConfigOrSecretManager', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('should return credentials from local config in local environment', async () => {
    process.env.NODE_ENV='local';
    process.env.DB_HOST = 'localhost';
    process.env.DB_PORT = '5432';
    process.env.DB_USER = 'user';
    process.env.DB_PASSWORD = 'password';
    process.env.DB_NAME = 'dbname';

    const result = await getDbCredentialsFromLocalConfigOrSecretManager();
    expect(result).toEqual({
      HOST: 'localhost',
      PORT: '5432',
      DB_USER: 'user',
      PASSWORD: 'password',
      DB_NAME: 'dbname',
    });
  });

  it('should return credentials from AWS secret manager in production environment', async () => {
    process.env.NODE_ENV = 'production';
    process.env.AWS_REGION = 'us-east-1';
    process.env.DB_NAME = 'dbname';
    process.env.DB_CONFIG_SECRET_PREFIX = 'path-to-db-secrets';

    const awsSecretInstance = new AwsSecret({ region: 'us-east-1' });
    jest.spyOn(awsSecretInstance, 'getSecret').mockResolvedValue({
      HOST: 'prod-host',
      PORT: 5432,
      DB_USER: 'prod-user',
      PASSWORD: 'prod-password',
      DB_NAME: 'prod-dbname',
    });

    const result = await getDbCredentialsFromLocalConfigOrSecretManager();
    expect(result).toEqual({
      HOST: 'prod-host',
      PORT: 5432,
      DB_USER: 'prod-user',
      PASSWORD: 'prod-password',
      DB_NAME: 'prod-dbname',
    });
  });
});

describe('getDbName', () => {
  it('should return default value if environment variable is not JSON-parseable', () => {
    process.env.TEST_ENV_VAR = 'invalid-json';

    const result = getDbName('TEST_ENV_VAR', 'default-db');
    expect(result).toBe('default-db');
  });

  it('should return db_name from environment variable', () => {
    process.env.TEST_ENV_VAR = JSON.stringify({ db_name: 'test-db' });

    const result = getDbName('TEST_ENV_VAR', 'default-db');
    expect(result).toBe('test-db');
  });
});
