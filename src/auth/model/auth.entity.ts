import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('auth')
export class Auth {
	constructor(entity: Partial<Auth>) {
		Object.assign(this, entity);
	}

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	email: string;

	@Column()
	access_token: string;

	@Column()
	refresh_token: string;
}
