import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { of } from 'rxjs';
import { EnumCrudOperations } from '@app/user/enum/crud.enum';
import { EnumResponseStatus } from '@app/user/enum/response.enum';
import { dateFormatter } from '@app/utils/date-formatter.utils';
import { SuccessResponseDto } from '@user/dto/success-response.dto';
import { User } from '@user/entities/user.entity';
import { UserService } from '@user/user.service';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UserService', () => {
  let service: UserService;
  let module: TestingModule;
  let globalExecutedAt: string;
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

  beforeEach(async (done) => {
    module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: Repository,
        },
      ],
    }).compile();

    // Get UserService instantiated object from module
    service = module.get<UserService>(UserService);

    globalExecutedAt = dateFormatter(new Date());

    done();
  });

  it('should be defined', (done) => {
    expect(service).toBeDefined();
    done();
  });

  it('Should create an user', (done) => {
    // Mock create method on service
    jest.spyOn(service, 'create').mockImplementation((data) =>
      of<SuccessResponseDto<User>>({
        executedAt: globalExecutedAt,
        message: EnumResponseStatus.CREATE_USER,
        method: EnumCrudOperations.CREATE,
        data: data,
      }),
    );

    service.create(userMock[0] as any).subscribe(
      (subscriber) => {
        expect(subscriber).toBeDefined();
        expect(subscriber).toMatchObject({
          executedAt: globalExecutedAt,
          message: EnumResponseStatus.CREATE_USER,
          method: EnumCrudOperations.CREATE,
          data: userMock[0],
        });
        expect(subscriber.data).toBe(userMock[0]);
      },
      (error) => {
        expect(error).toBeUndefined();
        expect(error).not.toThrowError();
      },
      () => done(),
    );
  });

  it('Should find one user', (done) => {
    let userId = { id: 2 };

    // Mock findOne method on service
    jest.spyOn(service, 'findOne').mockImplementation((id) =>
      of<SuccessResponseDto<User>>({
        executedAt: globalExecutedAt,
        message: EnumResponseStatus.READ_USER,
        method: EnumCrudOperations.READ,
        data: userMock.find((user) => user.id == id) as User,
      }),
    );
    service.findOne(userId.id).subscribe(
      (subscriber) => {
        expect(subscriber).toBeDefined();
        expect(subscriber).toMatchObject({
          executedAt: globalExecutedAt,
          message: EnumResponseStatus.READ_USER,
          method: EnumCrudOperations.READ,
          data: userMock[1],
        });
        expect(subscriber.data).toBe(userMock[1]);
      },
      (error) => {
        expect(error).toBeUndefined();
        expect(error).not.toThrowError();
      },
      () => done(),
    );
  });

  it('Should find all user', (done) => {
    // Mock findAll method on service
    jest.spyOn(service, 'findAll').mockImplementation(() =>
      of<SuccessResponseDto<User[]>>({
        executedAt: globalExecutedAt,
        message: EnumResponseStatus.READ_USER,
        method: EnumCrudOperations.READ,
        data: userMock as User[],
      }),
    );

    service.findAll(null).subscribe(
      (subscriber) => {
        expect(subscriber).toBeDefined();
        expect(subscriber).toMatchObject({
          executedAt: globalExecutedAt,
          message: EnumResponseStatus.READ_USER,
          method: EnumCrudOperations.READ,
          data: userMock,
        });
        expect(subscriber.data).toBe(userMock);
      },
      (error) => {
        expect(error).toBeUndefined();
        expect(error).not.toThrowError();
      },
      () => done(),
    );
  });

  it('Should update user', (done) => {
    let updatedUserId = { id: 2 };

    // Mock findAll method on service
    jest.spyOn(service, 'update').mockImplementation((id, _) =>
      of<SuccessResponseDto<object>>({
        executedAt: globalExecutedAt,
        message: EnumResponseStatus.UPDATE_USER,
        method: EnumCrudOperations.UPDATE,
        data: {
          id: id,
        },
      }),
    );

    service.update(updatedUserId.id, userMock[1] as UpdateUserDto).subscribe(
      (subscriber) => {
        expect(subscriber).toBeDefined();
        expect(subscriber).toMatchObject({
          executedAt: globalExecutedAt,
          message: EnumResponseStatus.UPDATE_USER,
          method: EnumCrudOperations.UPDATE,
          data: {
            id: updatedUserId.id,
          },
        });
        expect(subscriber.data['id']).toBe(updatedUserId.id);
      },
      (error) => {
        expect(error).toBeUndefined();
        expect(error).not.toThrowError();
      },
      () => done(),
    );
  });

  it('Should delete user by id', (done) => {
    let deletedUser = { id: 3 };

    // Mock create method on service
    jest.spyOn(service, 'remove').mockImplementation((id) =>
      of<SuccessResponseDto<object>>({
        executedAt: globalExecutedAt,
        message: EnumResponseStatus.DELETE_USER,
        method: EnumCrudOperations.DELETE,
        data: {
          id: id,
        },
      }),
    );
    service.remove(deletedUser.id).subscribe(
      (subscriber) => {
        expect(subscriber).toBeDefined();
        expect(subscriber).toMatchObject({
          executedAt: globalExecutedAt,
          message: EnumResponseStatus.DELETE_USER,
          method: EnumCrudOperations.DELETE,
          data: {
            id: deletedUser.id,
          },
        });
        expect(subscriber.data['id']).toBe(deletedUser.id);
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
