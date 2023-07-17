import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { ReviewService } from '@app/review/domain/services/reviewService';
import { CreateReviewDto, ResourceReviewDto, UpdateReviewDto } from '@app/review/dto/review.dto';
import { CreateReviewPipe } from '@app/review/pipe/create-review';
import { BaseSuccessDto } from '@app/review/dto/shared/base-success.dto';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get(':id')
  async getReviewById(@Param('id', ParseUUIDPipe) id: string): Promise<ResourceReviewDto> {
    return this.reviewService.getById(id);
  }

  @Post('/create')
  async createReview(@Body() request: CreateReviewDto): Promise<ResourceReviewDto> {
    return this.reviewService.createReview(request);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() request: UpdateReviewDto,
  ): Promise<BaseSuccessDto> {
    return this.reviewService.updateReview(id, request);
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<BaseSuccessDto> {
    return this.reviewService.deleteReview(id);
  }
}
