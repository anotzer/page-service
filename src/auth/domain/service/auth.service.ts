import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from '@app/auth/dto/auth.dto';
import { AuthRepository } from '@app/auth/domain/repository/auth.repository';
import { genSaltSync, hashSync, compare } from 'bcryptjs';
import { User } from '@app/auth/model/user.entity';
import { GEN_SALT_ROUNDS, USER_NOT_FOUND, WRONG_PASSWORD_ERROR } from '@app/auth/auth.constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		private readonly authRepository: AuthRepository,
		private readonly jwtService: JwtService,
	) {}

	async createUser(dto: AuthDto) {
		const salt = genSaltSync(GEN_SALT_ROUNDS);
		const newUser = new User({
			email: dto.email,
			passwordHash: hashSync(dto.password, salt),
		});

		return this.authRepository.createUser(new User(newUser));
	}

	async loginUser(dto: AuthDto) {
		const email = dto.email;
		const password = dto.password;

		const { email: validatedUserEmail } = await this.validateUser(email, password);

		const token = await this.getAccessToken(validatedUserEmail);

		await this.authRepository.saveAccessToken({
			access_token: token.access_token,
			refresh_token: '',
			email: validatedUserEmail,
		});

		return token;
	}
	ldf[eznt,tfytgfhjkm
	async findUser(email: string): Promise<User> {
		return this.authRepository.findUser(email);
	}

	private async validateUser(email: string, password: string): Promise<Pick<User, 'email'>> {
		const user = await this.findUser(email);

		if (!user) {
			throw new UnauthorizedException(USER_NOT_FOUND);
		}

		const isCorrectPassword = await compare(password, user.passwordHash);

		if (!isCorrectPassword) {
			throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
		}

		return {
			email: user.email,
		};
	}

	private async getAccessToken(email: string) {
		const payload = { email };

		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}
}
