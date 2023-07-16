import { Module, ValidationPipe } from '@nestjs/common';
import { ReviewModule } from '@app/review/review.module';
import { DatabaseModule } from '@app/database/database.module';
import { APP_PIPE } from '@nestjs/core';
import { AuthModule } from '@app/auth/auth.module';

@Module({
	imports: [DatabaseModule, ReviewModule, AuthModule],
	controllers: [],
	providers: [
		{
			provide: APP_PIPE,
			useValue: new ValidationPipe({
				transform: true,
				forbidUnknownValues: false,
				// whitelist: true,
			}),
		},
	],
})
export class AppModule {}
