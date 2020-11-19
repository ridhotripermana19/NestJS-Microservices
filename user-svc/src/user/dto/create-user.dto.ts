import { OmitType } from '@nestjs/mapped-types';
import { User } from '@user/entities/user.entity';

export class CreateUserDto extends OmitType(User, [
  'id',
  'updatedAt',
  'createdAt',
]) {}
