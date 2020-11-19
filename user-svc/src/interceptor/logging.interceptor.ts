import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { RedisContext } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    let redisCtx = context.switchToRpc().getContext<RedisContext>();
    let channelName = redisCtx.getChannel();
    let args = redisCtx.getArgs();
    return next
      .handle()
      .pipe(
        tap(() =>
          Logger.debug(
            `Method is being executed on ${channelName} with args ${args}`,
            this.constructor.name,
            true,
          ),
        ),
      );
  }
}
