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
import { Model, Types } from 'mongoose';
import { UserService } from './user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../schema/user.schema';

const userModelMock = {
  create: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
};

describe('userService', () => {
  let service: UserService;
  let model: jest.Mocked<Model<User>>;

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

    service = module.get(UserService);
    model = module.get(getModelToken('User'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should insert a new user', async () => {
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
      const result = await service.create(createUserDto);

      expect(result).toEqual(mockedUser);
      expect(model.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findOne', () => {
    it('should return one user', async () => {
      const mockedUser = {
        auth0Id: 'auth0|123',
        username: 'testUser',
        firstName: 'Test',
        lastName: 'User',
        email: 'testuser@example.com',
      };
      model.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockedUser),
      } as any);

      const id = new Types.ObjectId().toString();
      const result = await service.findOne(id);

      expect(result).toEqual(mockedCat);
      expect(model.findOne).toHaveBeenCalledWith({ _id: id });
    });
  });
});
