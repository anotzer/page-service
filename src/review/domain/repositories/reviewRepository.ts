import { Injectable } from '@nestjs/common';
import { DeleteResult, EntityManager, UpdateResult } from 'typeorm';
import { Review } from '@app/review/model/review.entity';
import { InjectEntityManager } from '@nestjs/typeorm';

@Injectable()
export class ReviewRepository {
	constructor(@InjectEntityManager() private readonly entityManager: EntityManager) {}

	getById(id: string): Promise<Review> {
		return this.entityManager.findOne(Review, { where: { id } });
	}

	save(data: Review): Promise<Review> {
		return this.entityManager.save(Review, data);
	}

	update(id: string, data: Review): Promise<UpdateResult> {
		return this.entityManager.update(Review, { id: id }, { ...data });
	}

	delete(id: string): Promise<DeleteResult> {
		return this.entityManager.delete(Review, { id: id });
	}
}
