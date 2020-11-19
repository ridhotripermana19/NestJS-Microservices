import { UserSubscriber } from '@app/user/subscriber/user.subscriber';

export const config = () => ({
  database: {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    autoLoadEntities: true,
    subscribers: [UserSubscriber],
    logger: process.env.NODE_ENV.includes('dev')
      ? 'advanced-console'
      : undefined,
    logging: process.env.NODE_ENV.includes('dev') ? true : false,
    dropSchema: process.env.NODE_ENV.includes('dev') ? true : false,
    synchronize: process.env.NODE_ENV.includes('dev') ? true : false,
  },
});
