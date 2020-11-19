import { Injectable } from '@nestjs/common';
import { FindManyOptions, Repository } from 'typeorm';
import { defer } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { EnumCrudOperations } from '@app/user/enum/crud.enum';
import { EnumResponseStatus } from '@app/user/enum/response.enum';
import { dateFormatter } from '@app/utils/date-formatter.utils';
import { SuccessResponseDto } from '@user/dto/success-response.dto';
import { UpdateUserDto } from '@user/dto/update-user.dto';
import { User } from '@user/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  /**
   *
   * @param data
   */
  create(data: User) {
    return defer<Promise<SuccessResponseDto<User>>>(async () => {
      let users = await this.userRepo.save(this.userRepo.create(data));
      return {
        executedAt: dateFormatter(new Date()),
        message: EnumResponseStatus.CREATE_USER,
        method: EnumCrudOperations.CREATE,
        data: users,
      };
    });
  }

  /**
   *
   * @param options
   */
  findAll(options: FindManyOptions<User>) {
    if (options != '' || options != null || typeof options !== 'undefined')
      return defer<Promise<SuccessResponseDto<User[]>>>(async () => {
        let users = await this.userRepo.find(options);
        return {
          executedAt: dateFormatter(new Date()),
          message: EnumResponseStatus.READ_USER,
          method: EnumCrudOperations.READ,
          data: users,
        };
      });
    else
      return defer<Promise<SuccessResponseDto<User[]>>>(async () => {
        let users = await this.userRepo.find();
        return {
          executedAt: dateFormatter(new Date()),
          message: EnumResponseStatus.READ_USER,
          method: EnumCrudOperations.READ,
          data: users,
        };
      });
  }

  /**
   *
   * @param id
   */
  findOne(id: number) {
    return defer<Promise<SuccessResponseDto<User>>>(async () => {
      let user = await this.userRepo.findOneOrFail({ id: id });
      return {
        executedAt: dateFormatter(new Date()),
        message: EnumResponseStatus.READ_USER,
        method: EnumCrudOperations.READ,
        data: user,
      };
    });
  }

  /**
   *
   * @param id
   * @param updateUserDto
   */
  update(id: number, updateUserDto: UpdateUserDto) {
    return defer<Promise<SuccessResponseDto<object>>>(async () => {
      await this.userRepo.update(id, updateUserDto);
      return {
        executedAt: dateFormatter(new Date()),
        message: EnumResponseStatus.UPDATE_USER,
        method: EnumCrudOperations.UPDATE,
        data: {
          id: id,
        },
      };
    });
  }

  /**
   *
   * @param id
   */
  remove(id: number) {
    return defer<Promise<SuccessResponseDto<object>>>(async () => {
      await this.userRepo.delete(id);
      return {
        executedAt: dateFormatter(new Date()),
        message: EnumResponseStatus.DELETE_USER,
        method: EnumCrudOperations.DELETE,
        data: {
          id: id,
        },
      };
    });
  }
}
