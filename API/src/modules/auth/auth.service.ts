import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  // isValidAuth0Payload(payload: any): payload is Auth0Payload {
  //   return (
  //     typeof payload === 'object' && plainToInstance(Auth0Payload, payload)
  //   );
  // }

  // async validateUser(auth0Id: string): Promise<any> {
  //   const user = await this.usersService.findOne(auth0Id);
  //   if (user && user.auth0Id === auth0Id) {
  //     // const { auth0Id, ...result } = user;
  //     // return result;
  //     return user;
  //   }
  //   return null;
  // }

  //  NEST DOCS AUTH/PASSPORT EXAMPLE

  // async validateUser(username: string, pass: string): Promise<any> {
  //   const user = await this.usersService.findOne(username);
  //   if (user && user.password === pass) {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }
}
