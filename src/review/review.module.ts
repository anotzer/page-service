import { Module } from '@nestjs/common';
import { ReviewController } from './controller/review.controller';
import { ReviewService } from './domain/services/reviewService';
import { ReviewRepository } from './domain/repositories/reviewRepository';

const services = [ReviewService];
const repositories = [ReviewRepository];

@Module({
	controllers: [ReviewController],
	providers: [...services, ...repositories],
})
export class ReviewModule {}
