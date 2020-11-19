import { EnumCrudOperations } from '@app/user/enum/crud.enum';
import { EnumResponseStatus } from '@app/user/enum/response.enum';
import { dateFormatter } from '@app/utils/date-formatter.utils';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { SuccessResponseDto } from '@user/dto/success-response.dto';
import { UpdateUserDto } from '@user/dto/update-user.dto';
import { UserController } from '@user/user.controller';
import { UserService } from '@user/user.service';
import { User } from '@user/entities/user.entity';
import { CreateUserDto } from '@user/dto/create-user.dto';
import { FindAllUserOptionsDto } from './dto/find-all-user.dto';

describe('UserController', () => {
  let controller: UserController;
  let module: TestingModule;
  let globalExecutedAt = dateFormatter(new Date());

  // Mock file testing
  let userMock = [
    {
      id: 1,
      username: 'Ridho',
      password: 'Ridho',
      email: 'Ridho@mail.com',
    },
    {
      id: 2,
      username: 'Triwibowo',
      password: 'Triwibowo',
      email: 'Triwibowo@mail.com',
    },
    {
      id: 3,
      username: 'Permana',
      password: 'Permana',
      email: 'Permana@mail.com',
    },
    {
      id: 4,
      username: 'Testing',
      password: 'Testing',
      email: 'Testing@mail.com',
    },
  ];

  beforeAll(async (done) => {
    module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: (data: CreateUserDto) =>
              of<SuccessResponseDto<User>>({
                executedAt: globalExecutedAt,
                message: EnumResponseStatus.CREATE_USER,
                method: EnumCrudOperations.CREATE,
                data: userMock.find(
                  (user) => user.username == data.username,
                ) as User,
              }),
            findOne: (id: number) =>
              of<SuccessResponseDto<User>>({
                executedAt: globalExecutedAt,
                message: EnumResponseStatus.READ_USER,
                method: EnumCrudOperations.READ,
                data: userMock.find((user) => user.id == id) as User,
              }),
            findAll: (options?: FindAllUserOptionsDto<User>) =>
              of<SuccessResponseDto<User[]>>({
                executedAt: globalExecutedAt,
                message: EnumResponseStatus.READ_USER,
                method: EnumCrudOperations.READ,
                data: userMock as User[],
              }),
            update: (id: number, updateUserDto: UpdateUserDto) =>
              of<SuccessResponseDto<object>>({
                executedAt: globalExecutedAt,
                message: EnumResponseStatus.UPDATE_USER,
                method: EnumCrudOperations.UPDATE,
                data: {
                  id: id,
                },
              }),
            remove: (id: number) =>
              of<SuccessResponseDto<object>>({
                executedAt: globalExecutedAt,
                message: EnumResponseStatus.DELETE_USER,
                method: EnumCrudOperations.DELETE,
                data: {
                  id: id,
                },
              }),
          },
        },
      ],
    }).compile();
    controller = module.get<UserController>(UserController);
    done();
  });

  it('should be defined', (done) => {
    expect(controller).toBeDefined();
    done();
  });

  it('should create an user', (done) => {
    controller.create(userMock[0]).subscribe(
      (subscriber) => {
        expect(subscriber).toBeDefined();
        expect(subscriber).toMatchObject({
          executedAt: globalExecutedAt,
          message: EnumResponseStatus.CREATE_USER,
          method: EnumCrudOperations.CREATE,
          data: userMock[0],
        });
        expect(subscriber.data).toMatchObject(userMock[0]);
        expect(subscriber.data).toBe(userMock[0]);
      },
      (error) => {
        expect(error).toBeUndefined();
        expect(error).not.toThrowError();
      },
      () => done(),
    );
  });

  it('should find an user', (done) => {
    controller.findOne(1).subscribe(
      (subscriber) => {
        expect(subscriber).toBeDefined();
        expect(subscriber).toMatchObject({
          executedAt: globalExecutedAt,
          message: EnumResponseStatus.READ_USER,
          method: EnumCrudOperations.READ,
          data: userMock[0],
        });
        expect(subscriber.data).toMatchObject(userMock[0]);
        expect(subscriber.data).toBe(userMock[0]);
      },
      (error) => {
        expect(error).toBeUndefined();
        expect(error).not.toThrowError();
      },
      () => done(),
    );
  });

  it('should find all users', (done) => {
    controller.findAll(null).subscribe(
      (subscriber) => {
        expect(subscriber).toBeDefined();
        expect(subscriber).toMatchObject({
          executedAt: globalExecutedAt,
          message: EnumResponseStatus.READ_USER,
          method: EnumCrudOperations.READ,
          data: userMock,
        });
        expect(subscriber.data).toMatchObject(userMock);
        expect(subscriber.data).toEqual(userMock);
      },
      (error) => {
        expect(error).toBeUndefined();
        expect(error).not.toThrowError();
      },
      () => done(),
    );
  });

  it('Should update an user', (done) => {
    controller.update(userMock[1] as User).subscribe(
      (subscriber) => {
        expect(subscriber).toBeDefined();
        expect(subscriber).toMatchObject({
          executedAt: globalExecutedAt,
          message: EnumResponseStatus.UPDATE_USER,
          method: EnumCrudOperations.UPDATE,
          data: {
            id: userMock[1].id,
          },
        });
        expect(subscriber.data).toMatchObject({
          id: userMock[1].id,
        });
        expect(subscriber.data).toEqual({ id: userMock[1].id});
      },
      (error) => {
        expect(error).toBeUndefined();
        expect(error).not.toThrowError();
      },
      () => done(),
    );
  });

  it('Should delete an user', (done) => {
    controller.remove(userMock[1].id).subscribe(
      (subscriber) => {
        expect(subscriber).toBeDefined();
        expect(subscriber).toMatchObject({
          executedAt: globalExecutedAt,
          message: EnumResponseStatus.DELETE_USER,
          method: EnumCrudOperations.DELETE,
          data: {
            id: userMock[1].id,
          },
        });
        expect(subscriber.data).toMatchObject({
          id: userMock[1].id,
        });
        expect(subscriber.data).toEqual({ id: userMock[1].id });
      },
      (error) => {
        expect(error).toBeUndefined();
        expect(error).not.toThrowError();
      },
      () => done(),
    );
  });

  afterAll(async (done) => {
    await module.close();
    done();
  });
});
