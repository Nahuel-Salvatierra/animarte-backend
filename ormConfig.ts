import * as dotenv from 'dotenv';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();

export enum ENVIRONMENTS {
  DEVELOPMENT = 'development',
  AUTOMATED_TEST = 'automated-tests',
}



const development: DataSourceOptions = {
  type: 'better-sqlite3',
  database: 'DATABASE.sqlite',
  synchronize: true,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
};

const automatedTests: DataSourceOptions = {
  type: 'better-sqlite3',
  database: `data/test.${Math.random()}.sqlite`,
  migrations: ['./data/migration/**/*.ts'],
  synchronize: true,
  dropSchema: false,
  // verbose: console.log,
};

export const dataSourceOptions: DataSourceOptions = (() => {

  if (process.env.NODE_ENV === ENVIRONMENTS.DEVELOPMENT) {
    return development;
  }

  if (process.env.NODE_ENV === ENVIRONMENTS.AUTOMATED_TEST) {
    return automatedTests;
  }

  throw new Error('No environment defined');
})();

export default new DataSource({
  ...dataSourceOptions,
  entities: [join(__dirname, 'src/**/infrastructure/persistence/*.schema.ts')],
});
