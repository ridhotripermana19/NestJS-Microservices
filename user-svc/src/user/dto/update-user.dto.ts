import { OmitType } from '@nestjs/mapped-types';
import { User } from '@user/entities/user.entity';

export class UpdateUserDto extends OmitType(User, ['createdAt', 'updatedAt']) {}
