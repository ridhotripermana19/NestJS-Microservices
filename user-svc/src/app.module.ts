import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '@user/user.module';
import { config } from '@app/config/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigService } from '@config/database.config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from '@filter/http-exception.filter';
import { ErrorsLoggingInterceptor } from './interceptor/error-logging.interceptor';
import { LoggingInterceptor } from './interceptor/logging.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfigService,
    }),
    UserModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorsLoggingInterceptor,
    },
    process.env.NODE_ENV.includes('dev') ||
    process.env.NODE_ENV.includes('test')
      ? {
          provide: LoggingInterceptor,
          useClass: LoggingInterceptor,
        }
      : undefined,
  ],
})
export class AppModule {}
