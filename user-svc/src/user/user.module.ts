import { Module } from '@nestjs/common';
import { UserService } from '@user/user.service';
import { UserController } from '@user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@user/entities/user.entity';
import { UserSubscriber } from '@user/subscriber/user.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserSubscriber],
  controllers: [UserController],
})
export class UserModule {}
