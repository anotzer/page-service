import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { User } from '@app/auth/model/user.entity';
import { Auth } from '@app/auth/model/auth.entity';

@Injectable()
export class AuthRepository {
	constructor(private readonly manager: EntityManager) {}

	async createUser(user: User): Promise<User> {
		return this.manager.save(User, user);
	}

	async findUser(email: string): Promise<User> {
		return this.manager.findOne(User, { where: { email: email } });
	}

	async saveAccessToken(userInfo: { access_token: string; refresh_token: string; email: string }) {
		return this.manager.save(Auth, userInfo);
	}
}
