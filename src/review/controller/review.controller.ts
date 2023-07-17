import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ReviewService } from '@app/review/domain/services/reviewService';
import { CreateReviewDto, ResourceReviewDto, UpdateReviewDto } from '@app/review/dto/review.dto';
import { BaseSuccessDto } from '@app/review/dto/shared/base-success.dto';
import { JwtAuthGuard } from '@app/auth/guards/jwt.guard';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get(':id')
  async getReviewById(@Param('id', ParseUUIDPipe) id: string): Promise<ResourceReviewDto> {
    return this.reviewService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createReview(@Body() request: CreateReviewDto): Promise<ResourceReviewDto> {
    return this.reviewService.createReview(request);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() request: UpdateReviewDto,
  ): Promise<BaseSuccessDto> {
    return this.reviewService.updateReview(id, request);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<BaseSuccessDto> {
    return this.reviewService.deleteReview(id);
  }
}
