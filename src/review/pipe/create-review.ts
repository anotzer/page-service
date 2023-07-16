import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { CreateReviewDto } from '@app/review/dto/review.dto';

export class CreateReviewPipe implements PipeTransform {
  transform(params: CreateReviewDto, metadata: ArgumentMetadata): CreateReviewDto {
    const result = new CreateReviewDto();

    result.name = params.name;
    result.title = params.title;
    result.description = params.description;
    result.rating = params.rating;

    return result;
  }
}
