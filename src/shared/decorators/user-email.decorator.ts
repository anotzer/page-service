// Это обертка чтобы достать контекст запроса
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserEmail = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();

  return request.user;
});
