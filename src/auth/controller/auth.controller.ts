import {
	Controller,
	Post,
	HttpCode,
	Body,
	UsePipes,
	ValidationPipe,
	BadRequestException,
} from '@nestjs/common';
import { AuthDto } from '@app/auth/dto/auth.dto';
import { AuthService } from '@app/auth/domain/service/auth.service';
import { USER_WITH_EMAIL_ALREADY_REGISTERED } from '@app/auth/auth.constants';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UsePipes(new ValidationPipe())
	@Post('register')
	async register(@Body() dto: AuthDto) {
		const user = await this.authService.findUser(dto.email);

		if (user) {
			throw new BadRequestException(USER_WITH_EMAIL_ALREADY_REGISTERED);
		}

		return this.authService.createUser(dto);
	}

	@UsePipes(new ValidationPipe())
	// Because post req return 201
	@HttpCode(200)
	@Post('login')
	async login(@Body() dto: AuthDto) {
		return this.authService.loginUser(dto);
	}
}
