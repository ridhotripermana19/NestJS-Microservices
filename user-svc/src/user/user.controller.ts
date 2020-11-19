import { messagePattern } from '@app/constant';
import { LoggingInterceptor } from '@app/interceptor/logging.interceptor';
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from '@user/dto/create-user.dto';
import { UpdateUserDto } from '@user/dto/update-user.dto';
import { UserService } from '@user/user.service';
import { FindAllUserOptionsDto } from '@user/dto/find-all-user.dto';
import { User } from '@user/entities/user.entity';

@Controller()
@UseInterceptors(LoggingInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(messagePattern.pattern.createUser)
  create(@Payload() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto as any);
  }

  @MessagePattern(messagePattern.pattern.findAllUser)
  findAll(options?: FindAllUserOptionsDto<User>) {
    return this.userService.findAll(options);
  }

  @MessagePattern(messagePattern.pattern.findOneUser)
  findOne(@Payload() id: number) {
    return this.userService.findOne(id);
  }

  @MessagePattern(messagePattern.pattern.updateUser)
  update(@Payload() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto.id, updateUserDto);
  }

  @MessagePattern(messagePattern.pattern.removeUser)
  remove(@Payload() id: number) {
    return this.userService.remove(id);
  }

  @Get('/cats')
  test() {
    return 'hallo';
  }
}
