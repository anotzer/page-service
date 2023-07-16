import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsString } from 'class-validator';

@Entity('users')
export class User {
	constructor(entity: Partial<User>) {
		Object.assign(this, entity);
	}

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@IsString()
	@Column({ unique: true })
	email: string;

	@IsString()
	@Column()
	passwordHash: string;
}
