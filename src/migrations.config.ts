import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';
dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: +process.env.DB_PORT || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_INSTANCE || 'ecommerce-app-dev',
  entities: [join(__dirname, '**/**.entity{.ts,.js}')],
  migrations: ['dist/db/migrations/*.js'],
  synchronize: process.env.DB_SYNC === 'true' ? true : false,
  migrationsRun: true,
});
