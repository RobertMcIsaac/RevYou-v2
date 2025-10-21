// import {
//   CanActivate,
//   ExecutionContext,
//   ForbiddenException,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { FastifyRequest } from 'fastify';
// import { Observable } from 'rxjs';

// import { Auth0PayloadDto } from '../dto/auth0Payload.dto';

// // interface School {
// //   id: string;
// //   name: string;
// //   userSchoolId: string;
// //   roles: string[];
// // }

// // interface UserPayLoad {
// //   id: string;
// //   username: string;
// //   email: string;
// //   isGlobalAdmin: boolean;
// //   schools: School[];
// //   iat: number;
// //   exp: number;
// // }

// interface AuthenticatedRequest extends FastifyRequest {
//   auth0Payload: Auth0PayloadDto;
// }

// @Injectable()
// export class EnsureUserGuard implements CanActivate {
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const request: AuthenticatedRequest = context.switchToHttp().getRequest();
//     const user = request.user;

//     if (!user) {
//       throw new UnauthorizedException('User does not exist');
//     }

//     // const schoolAdmin =
//     //   Array.isArray(user.schools) &&
//     //   user.schools.some((school) => school.roles.includes('admin'));
//     // const GlobalAdmin = user.isGlobalAdmin;

//     // if (!schoolAdmin && !GlobalAdmin) {
//     //   throw new ForbiddenException(
//     //     'You do not have permission to access this endpoint',
//     //   );
//     // }

//     return true;
//   }
// }
