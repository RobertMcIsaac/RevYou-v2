import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model, Types } from 'mongoose';
import { UserService } from '@/modules/user/service/user.service';
import { CreateUserDto } from '@modules/user/dto/create-user.dto';
import { User } from '@/modules/user/schema/user.schema';

const userModelMock = {
  create: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
};

describe('UserService', () => {
  let userService: UserService;
  let model: jest.Mocked<Model<User>>;

  // type User = {
  //   auth0Id: string;
  //   username: string;
  //   firstName: string;
  //   lastName: string;
  //   email: string;
  // };

  // type Auth0Profile = {
  //   email: string;
  //   nickname?: string;
  //   given_name?: string;
  //   family_name?: string;
  // };

  // const mockUser: User = {
  //   auth0Id: 'auth0|123',
  //   username: 'testUser',
  //   firstName: 'Test',
  //   lastName: 'User',
  //   email: 'testuser@example.com',
  // };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken('User'),
          useValue: userModelMock,
        },
      ],
    }).compile();

    userService = await module.get(UserService);
    model = module.get(getModelToken('User'));
    // userService = await module.resolve(UserService);
  });

  // afterEach(() => {
  //   jest.restoreAllMocks(); // Reset mocks after each test
  // });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('Create', () => {
    it('has a method called createUser', () => {
      expect(userService.createUser).toBeDefined();
    });
    // it('throws an error when auth0 sub is missing', async () => {
    //   await expect(
    //     userService.createUser('', { email: 'testuser@example.com' })
    //   ).rejects.toThrow(/auth0 sub/i);
    // });
    // it('throws an error when email is missing', async () => {
    //   await expect(
    //     userService.createUser('auth0|123', { email: '' })
    //   ).rejects.toThrow(/email/i);
    // });

    it('inserts a new user', async () => {
      const mockedUser: CreateUserDto = {
        auth0Id: 'auth0|123',
        username: 'testUser',
        firstName: 'Test',
        lastName: 'User',
        email: 'testuser@example.com',
      };
      model.create.mockResolvedValueOnce(mockedUser as any);

      const createUserDto = {
        auth0Id: 'auth0|123',
        username: 'testUser',
        firstName: 'Test',
        lastName: 'User',
        email: 'testuser@example.com',
      };
      const result = await userService.createUser(createUserDto);
      expect(result).toEqual(mockedUser);
      expect(model.create).toHaveBeenCalledWith(createUserDto);
    });
  });
});
