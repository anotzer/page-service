import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getOrmConfig } from './orm.config';

const dbDynamicModule = [
  TypeOrmModule.forRootAsync({
    useFactory() {
      return getOrmConfig(process.env);
    },
  }),
];

@Module({
  imports: [...dbDynamicModule],
})
export class DatabaseModule {}
