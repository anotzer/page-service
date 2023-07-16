import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const projectDir = resolve(__dirname, '../../');

// TODO: envFilePath (or all files is undefined)
const envFilePath = resolve(projectDir, './', '.env.dev');

export const getOrmConfig = (env: any): PostgresConnectionOptions => {
  return {
    type: 'postgres',
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    username: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
    schema: '',
    //TODO: learn entities directory
    //TODO: Entity was not found
    entities: [resolve(projectDir, 'dist', '**', '*.entity.{js,ts}')],
    namingStrategy: new SnakeNamingStrategy(),
    synchronize: true,
  };
};

//TODO: use to define .env file
dotenv.config({ path: envFilePath, override: false });
