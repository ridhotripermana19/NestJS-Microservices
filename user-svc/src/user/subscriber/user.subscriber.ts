import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  getRepository,
  InsertEvent,
} from 'typeorm';
import { User } from '@user/entities/user.entity';
import { genSalt, hash } from 'bcryptjs';
import { validateUser } from '@app/utils/validate-user.util';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  async beforeInsert(event: InsertEvent<User>) {
    await validateUser(event.entity, getRepository(User));
    event.entity.password = await hash(
      event.entity.password,
      await genSalt(10),
    );
  }
}
