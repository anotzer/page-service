import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from '@app/auth/domain/service/auth.service';
import { AuthRepository } from '@app/auth/domain/repository/auth.repository';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config'

const services = [AuthService];
const repositories = [AuthRepository];



const getJWTConfig = async (configService: ConfigService): Promise<JwtModuleOptions> => {
	return {
		secret: configService.get('JWT_SECRET'),
	};
};

@Module({
	imports: [
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => {
				return {
					secret: configService.get<string>('JWT_SECRET'),
				};
			},
		}),
	],
	controllers: [AuthController],
	providers: [...services, ...repositories],
})
export class AuthModule {}
