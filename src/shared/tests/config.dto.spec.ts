import { ConfigDto } from '../config.dto';
import { validate } from 'class-validator';

describe('ConfigDto', () => {
  it('should validate a valid DTO object', async () => {
    const dto = new ConfigDto();
    dto.DB_HOST = 'localhost';
    dto.DB_PORT = 5432;
    dto.DB_USER = 'user';
    dto.DB_PASSWORD = 'password';
    dto.DB_NAME = 'dbname';

    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('should fail validation if DB_HOST is missing', async () => {
    const dto = new ConfigDto();
    dto.DB_PORT = 5432;
    dto.DB_USER = 'user';
    dto.DB_PASSWORD = 'password';
    dto.DB_NAME = 'dbname';

    const errors = await validate(dto);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });
});
