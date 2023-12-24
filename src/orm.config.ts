import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const ormConfig: (
  configService: ConfigService,
) => TypeOrmModuleOptions = (configService) => ({
  type: 'postgres',
  host: configService.get('DB_HOST', 'localhost'),
  port: +configService.get('DB_PORT', '5432'),
  schema: configService.get('DB_SCHEMA', 'public'),
  username: configService.get('DB_USERNAME', 'postgres'),
  password: configService.get('DB_PASSWORD', 'password'),
  database: configService.get('DB_INSTANCE', 'ecommerce-app-dev'),
  entities: [join(__dirname, '**/**.entity.{.ts/.js}')],
  migrations: [join(__dirname, '**.migrations.{.ts/.js}')],
  synchronize: configService.get('DB_SYNC', false),
  namingStrategy: new SnakeNamingStrategy(),
});
