import { typeOrmConfig } from '../ormconfig';
import { DataSource } from 'typeorm';

const initializeDataSource = async () =>
  new DataSource({
    ...(await typeOrmConfig()),
  });

export default initializeDataSource();
