import { of } from 'rxjs';
import { Connection, createConnection } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserSubscriber } from './user.subscriber';

describe('UserSubscriber', () => {
  let connection: Connection;
  let subscriber: UserSubscriber;
  beforeAll(async (done) => {
    connection = await createConnection({
      type: 'sqlite',
      database: ':memory:',
      entities: [User],
      dropSchema: true,
      synchronize: true,
      logger: 'advanced-console',
      logging: true,
    });
    subscriber = new UserSubscriber(connection);
    done();
  });

  it('Should be defined', async (done) => {
    expect(subscriber).toBeDefined();
    done();
  });

  afterAll((done) => {
    done();
  });
});
