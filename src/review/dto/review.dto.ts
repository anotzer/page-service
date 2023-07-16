import { plainToClassFromExist } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

interface DefaultReviewInterface {
	name: string;
	title: string;
	description: string;
	rating: number;
}

interface ResourceReviewDtoInterface extends DefaultReviewInterface {
	id: string;
	created_at: Date;
	updated_at: Date;
}

export class DefaultReviewDto {
	@IsString()
	name: string;

	@IsString()
	title: string;

	@IsString()
	description: string;

	@IsNumber()
	rating: number;

	constructor(data?: DefaultReviewInterface) {
		plainToClassFromExist(this, data, {
			excludeExtraneousValues: true,
			exposeUnsetFields: false,
		});
	}
}

export class CreateReviewDto extends DefaultReviewDto {
	constructor() {
		super();
	}
}

export class UpdateReviewDto extends DefaultReviewDto {
	constructor() {
		super();
	}
}

export class ResourceReviewDto extends DefaultReviewDto {
	@IsString()
	id: string;

	@IsDate()
	created_at: Date;

	@IsDate()
	updated_at: Date;

	constructor(data?: ResourceReviewDtoInterface) {
		super();

		plainToClassFromExist(this, data, {
			excludeExtraneousValues: true,
			exposeUnsetFields: false,
		});
	}
}
