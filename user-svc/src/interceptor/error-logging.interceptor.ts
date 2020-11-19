import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
  
} from '@nestjs/common';
import { RedisContext } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ErrorsLoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap(
        () => {},
        (error) => {
          if (context.switchToRpc().getContext<RedisContext>() != null)
            Logger.error(
              `found an error in the class ${
                context.getClass().name
              } on channel ${context
                .switchToRpc()
                .getContext<RedisContext>()
                .getChannel()}\nerror: ${error.message}`,
              error.stack,
              this.constructor.name,
              true,
            );
          else
            Logger.error(
              `found an error in the class ${context.getClass().name}\nerror: ${
                error.message
              }`,
              error.stack,
              this.constructor.name,
              true,
            );
        },
      ),
    );
  }
}
