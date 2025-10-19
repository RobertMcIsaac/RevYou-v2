// import { Test, TestingModule } from '@nestjs/testing';
// import { UserService } from './user.service';

// describe('UserService', () => {
//   let userService: UserService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [UserService],
//     }).compile();

//     userService = module.get(UserService);
//   });

//   it('should be defined', () => {
//     expect(userService).toBeDefined();
//   });
// });

import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../schema/user.schema';

// mocks are typed to avoid unbound-method errors
const userModelMock = {
  create: jest.fn<Promise<User>, [CreateUserDto]>(),
  find: jest.fn(),
  findOne: jest.fn<{ exec: () => Promise<User | null> }, [Partial<User>]>(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
};

describe('UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken('User'),
          useValue: userModelMock,
        },
      ],
    }).compile();

    userService = module.get(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('create', () => {
    it('should insert a new user', async () => {
      const createUserDto: CreateUserDto = {
        auth0Id: 'auth0|123',
        username: 'testUser',
        firstName: 'Test',
        lastName: 'User',
        email: 'testuser@example.com',
      };

      const mockedUser: User = {
        auth0Id: 'auth0|123',
        username: 'testUser',
        firstName: 'Test',
        lastName: 'User',
        email: 'testuser@example.com',
      } as User;

      userModelMock.create.mockResolvedValueOnce(mockedUser);

      const result = await userService.create(createUserDto);

      expect(result).toEqual(mockedUser);
      expect(userModelMock.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findOneByAuth0Id', () => {
    it('should return one user', async () => {
      const mockedUser: User = {
        auth0Id: 'auth0|123',
        username: 'testUser',
        firstName: 'Test',
        lastName: 'User',
        email: 'testuser@example.com',
      } as User;

      userModelMock.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockedUser),
      });

      const result = await userService.findOneByAuth0Id(mockedUser.auth0Id);

      expect(result).toEqual(mockedUser);
      expect(userModelMock.findOne).toHaveBeenCalledWith({
        auth0Id: mockedUser.auth0Id,
      });
    });
  });
});
