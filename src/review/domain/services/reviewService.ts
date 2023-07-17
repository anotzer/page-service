import { Injectable, NotFoundException } from '@nestjs/common';
import { ReviewRepository } from '@app/review/domain/repositories/reviewRepository';
import { CreateReviewDto, ResourceReviewDto, UpdateReviewDto } from '@app/review/dto/review.dto';
import { Review } from '@app/review/model/review.entity';
import { BaseSuccessDto } from '@app/review/dto/shared/base-success.dto';

@Injectable()
export class ReviewService {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async getById(id: string) {
    const review = await this.reviewRepository.getById(id);

    if (!review) {
      throw new NotFoundException('review was not found');
    }

    return review;
  }

  async createReview(reviewRequest: CreateReviewDto): Promise<ResourceReviewDto> {
    return this.reviewRepository.save(new Review(reviewRequest));
  }

  async updateReview(id: string, reviewRequest: UpdateReviewDto): Promise<BaseSuccessDto> {
    return this.reviewRepository.update(id, new Review(reviewRequest)).then((res) => {
      return {
        success: Boolean(res.affected),
      };
    });
  }

  async deleteReview(id: string): Promise<BaseSuccessDto> {
    return this.reviewRepository.delete(id).then((res) => {
      return {
        success: Boolean(res.affected),
      };
    });
  }
}
