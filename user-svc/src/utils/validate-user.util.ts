import { User } from '@app/user/entities/user.entity';
import { ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';

export function validateUser(data: User, repo: Repository<User>) {
  return new Promise((resolve, reject) => {
    repo.count({ username: data.username }).then((result) => {
      !result
        ? repo.count({ email: data.email }).then((result) => {
            !result
              ? resolve()
              : reject(new ConflictException('Email is exists 😭'));
          })
        : reject(new ConflictException('Username is exists 😭'));
    });
  });
}
