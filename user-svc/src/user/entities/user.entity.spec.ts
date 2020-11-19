import { User } from '@user/entities/user.entity';

describe('User (Entity)', () => {
  it('Should be defined', (done) => {
    expect(new User()).toBeDefined();
    done();
  });
});
