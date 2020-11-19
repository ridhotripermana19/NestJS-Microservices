import { MicroserviceOptions, Transport } from '@nestjs/microservices';

export const microConfig: MicroserviceOptions = {
  transport: Transport.REDIS,
  options: {
    url: process.env.REDIS_URL,
    password: process.env.REDIS_PASS,
  },
};
