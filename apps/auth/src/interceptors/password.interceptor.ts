import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as bcrypt from 'bcrypt';

// intercepting password, hashing and returning it before the route handler goes off
@Injectable()
export class PasswordInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { password, ...rest } = request.body;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      request.body = {
        ...rest,
        password: hashedPassword,
      };
    }
    return next.handle();
  }
}
