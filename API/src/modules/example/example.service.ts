import { Injectable } from '@nestjs/common';

@Injectable()
export class ExampleService {
  // Example of a synchronous function
  printExample() {
    return 'This is an example message from controller';
  }
}
