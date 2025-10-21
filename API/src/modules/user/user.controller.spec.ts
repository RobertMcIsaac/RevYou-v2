import { Test, TestingModule } from '@nestjs/testing';
import { ThrottlerGuard } from '@nestjs/throttler';
import { CanActivate } from '@nestjs/common';
import { Types } from 'mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const userServiceMock = {
  create: jest.fn(),
  findOneByAuth0Id: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('UserController', () => {
  let userController: UserController;
  let userService: jest.Mocked<UserService>;

  beforeEach(async () => {
    const mockThrottlerGuard: CanActivate = {
      canActivate: jest.fn(() => true),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: userServiceMock,
        },
      ],
    })
      .overrideGuard(ThrottlerGuard)
      .useValue(mockThrottlerGuard)
      .compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<jest.Mocked<UserService>>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const mockedUser = {
        _id: new Types.ObjectId(),
        auth0Id: 'auth0|123',
        username: 'testUser',
        firstName: 'Test',
        lastName: 'User',
        email: 'testuser@example.com',
      };

      userService.create.mockResolvedValueOnce(mockedUser);

      const createUserDto: CreateUserDto = {
        auth0Id: 'auth0|123',
        username: 'testUser',
        firstName: 'Test',
        lastName: 'User',
        email: 'testuser@example.com',
      };

      const result = await userController.create(createUserDto);

      expect(result).toEqual(mockedUser);
      expect(userServiceMock.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findOneByAuth0Id', () => {
    it('should retrieve a user by their Auth0 sub', async () => {
      const mockedUser = {
        _id: new Types.ObjectId(),
        auth0Id: 'auth0|123',
        username: 'testUser',
        firstName: 'Test',
        lastName: 'User',
        email: 'testuser@example.com',
      };

      userService.findOneByAuth0Id.mockResolvedValueOnce(mockedUser);

      const readUserDto: CreateUserDto = {
        auth0Id: 'auth0|123',
        username: 'testUser',
        firstName: 'Test',
        lastName: 'User',
        email: 'testuser@example.com',
      };

      const result = await userController.findOneByAuth0Id(readUserDto);

      expect(result).toEqual(mockedUser);
      expect(userServiceMock.findOneByAuth0Id).toHaveBeenCalledWith(
        readUserDto.auth0Id,
      );
    });
  });

  // describe('update', () => {
  //   it('should update a users profile details', async () => {
  //   });
  // });

  // describe('delete', () => {
  //   it('should delete a user', async () => {
  //     );
  //   });
  // });
});
