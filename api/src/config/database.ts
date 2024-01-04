import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

const config = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT, 10),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    entities: ['dist/**/*.entity{.ts,.js}'],
    subscribers: ['dist/**/*.subscriber{.ts,.js}'],
    migrations: ['dist/migrations/*-migrations.js'],
    cli: {
        migrationsDir: 'dist/migrations',
    },
    autoLoadEntities: true,
    synchronize: false,
    migrationsRun: true,
    logging: true,
    ssl:
        process.env.ENVIRONMENT === 'prod'
            ? {
                  require: true,
              }
            : false,
};

export const dbConf = registerAs('typeorm', () => config);
export const dataSource = new DataSource(config as DataSourceOptions);
