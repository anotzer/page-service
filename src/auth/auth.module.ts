import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from '@app/auth/domain/service/auth.service';
import { AuthRepository } from '@app/auth/domain/repository/auth.repository';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '@app/auth/strategies/jwt-strategy';

const services = [AuthService];
const repositories = [AuthRepository];
const extraModules = [JwtStrategy];

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
        };
      },
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [...services, ...repositories, ...extraModules],
})
export class AuthModule {}
