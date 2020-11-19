import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from '@app/app.module';
import { microConfig } from '@config/micro.config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    // Microservice Configuration
    microConfig,
  );
  await app
    .listenAsync()
    .then(() => {
      Logger.debug('Microservices is Running', 'Main', true);
    })
    .catch((error) => Logger.error(error.message, error.stack, 'Main', true));
}

bootstrap();
