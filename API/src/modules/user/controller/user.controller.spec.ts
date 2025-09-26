import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { UserController } from './user.controller';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/create-user.dto';

const userServiceMock = {
  create: jest.fn(),
  findOneByAuth0Id: jest.fn(),
  update: jest.fn(),
  // delete: jest.fn(),
};

describe('UserController', () => {
  let userController: UserController;
  let userService: jest.Mocked<UserService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: userServiceMock,
        },
      ],
    }).compile();

    userController = module.get(UserController);
    userService = module.get(UserService);
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
      expect(userService).toHaveBeenCalledWith(createUserDto);
    });
  });
});
