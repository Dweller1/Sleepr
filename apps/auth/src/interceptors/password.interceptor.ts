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
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    let user = context.switchToHttp().getRequest();
    let { password, rest } = user;
    const hashedPassword = bcrypt.hash(password, 10);
    user = { password: hashedPassword, rest };
    return next.handle();
  }
}
