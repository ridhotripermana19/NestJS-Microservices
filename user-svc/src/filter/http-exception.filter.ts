import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    Logger.error(
      `${exception.getResponse()}\n${exception.getStatus()}\n${host.getArgs()}`,
      null,
      this.constructor.name,
      true,
    );
    return new RpcException(exception.getResponse());
  }
}
