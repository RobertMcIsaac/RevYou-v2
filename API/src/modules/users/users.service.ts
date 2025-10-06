import { Injectable } from '@nestjs/common';
import { UsersDto } from './dto/users.dto';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  users: User[] = [
    {
      auth0Id: 'auth0|123456',
      username: 'johnDoe',
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
    },
    {
      auth0Id: 'auth0|789012',
      username: 'janeSmith',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'janesmith@example.com',
    },
  ];

  findAll(): UsersDto[] {
    return this.users;
  }

  findOne(username: string): UsersDto | null {
    return this.users.find((user) => username === user.username);
  }

  findOneByAuth0Id(auth0Sub: string): UsersDto | null {
    return this.users.find((user) => auth0Sub === user.auth0Id);
  }

  create(user: UsersDto): UsersDto | null {
    this.users.push(user);
    console.log('SERVICE user created: ', this.users);
    return this.users[-1]
  }
}
