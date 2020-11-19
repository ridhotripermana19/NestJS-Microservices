import { CreateUserDto } from '@app/user/dto/create-user.dto';
import { INestApplication, Injectable } from '@nestjs/common';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '@app/user/entities/user.entity';
import { AppModule } from '@app/app.module';
import { DatabaseConfigService } from '@app/config/database.config';
import { messagePattern } from '@app/constant';
import { UpdateUserDto } from '@app/user/dto/update-user.dto';
import { getConnection } from 'typeorm';

@Injectable()
export class MockDB implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'sqlite',
      database: ':memory:',
      entities: [User],
      dropSchema: true,
      synchronize: true,
      logger: 'advanced-console',
      logging: true,
    };
  }
}

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let client: ClientProxy;
  // Mock file
  let createUser: CreateUserDto = {
    username: 'Ridho Permana',
    email: 'Ridhopermana19@',
    password: 'Rihaihaohaoa',
  };

  // Mock file
  let updatedUser: UpdateUserDto = {
    id: 1,
    username: 'Ridho Permana',
    email: 'Ridhopermana19@',
    password: 'Rihaihaohaoa',
  };

  let deletedUser: number = updatedUser.id;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        ClientsModule.register([
          {
            name: 'USER_SERVICE',
            transport: Transport.REDIS,
            options: {
              url: process.env.REDIS_URL,
            },
          },
        ]),
      ],
    })
      .overrideProvider(DatabaseConfigService)
      .useClass(MockDB)
      .compile();

    app = moduleFixture.createNestApplication();

    app.connectMicroservice({
      transport: Transport.REDIS,
      options: {
        url: process.env.REDIS_URL,
      },
    });
    await app.startAllMicroservicesAsync();
    await app.init();

    client = app.get('USER_SERVICE');
    await client.connect();
  });

  it(`MessagePattern (${messagePattern.pattern.createUser}) should be hash password before save to table and return the created user`, (done) => {
    client.send(messagePattern.pattern.createUser, createUser).subscribe({
      next: (user) => {
        expect(user).toBeDefined();
        expect(user).toHaveProperty('data.username', createUser.username);
        expect(user.data.password).not.toEqual(createUser.password);
        expect(user).toHaveProperty('data.email', createUser.email);
      },
      error: (error) => {
        expect(error).toBeUndefined();
        expect(error).not.toThrowError();
      },
      complete: () => done(),
    });
  });

  it(`MessagePattern (${messagePattern.pattern.findOneUser}) should be return the user with the given id`, (done) => {
    client.send(messagePattern.pattern.findOneUser, 1).subscribe({
      next: (user) => {
        expect(user).toBeDefined();
        expect(user).toHaveProperty('data.username', createUser.username);
        expect(user.data.password).not.toEqual(createUser.password);
        expect(user).toHaveProperty('data.email', createUser.email);
      },
      error: (error) => {
        expect(error).toBeUndefined();
        expect(error).not.toThrowError();
      },
      complete: () => done(),
    });
  });

  it(`MessagePattern (${messagePattern.pattern.findAllUser}) should be return all users (if options is not provided)`, (done) => {
    client.send(messagePattern.pattern.findAllUser, '').subscribe({
      next: (users) => {
        expect(users).toBeDefined();
        expect(users['data']).not.toEqual([createUser]);
        expect(users['data']).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              username: 'Ridho Permana',
              email: 'Ridhopermana19@',
            }),
          ]),
        );
      },
      error: (error) => {
        expect(error).toBeUndefined();
        expect(error).not.toThrowError();
      },
      complete: () => done(),
    });
  });

  it(`MessagePattern (${messagePattern.pattern.updateUser}) should be returned the updated user id with the given id`, (done) => {
    client.send(messagePattern.pattern.updateUser, updatedUser).subscribe({
      next: (users) => {
        expect(users).toBeDefined();
        expect(users['data']).toMatchObject({ id: updatedUser.id });
      },
      error: (error) => {
        expect(error).toBeUndefined();
        expect(error).not.toThrowError();
      },
      complete: () => done(),
    });
  });

  it(`MessagePattern (${messagePattern.pattern.removeUser}) should be returned the deleted user id with the given id`, (done) => {
    client.send(messagePattern.pattern.removeUser, deletedUser).subscribe({
      next: (user) => {
        expect(user).toBeDefined();
        expect(user['data']).toMatchObject({ id: deletedUser });
      },
      error: (error) => {
        expect(error).toBeUndefined();
        expect(error).not.toThrowError();
      },
      complete: () => done(),
    });
  });

  afterAll(async (done) => {
    await getConnection().getRepository(User).delete({});
    await client.close();
    await app.close();
    done();
  });
});
