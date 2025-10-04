import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';

@Injectable()
export class ExampleService {
  private readonly logger = new Logger(ExampleService.name);

  // Example of a synchronous function
  printExample() {
    this.logger.log('Printing example message');
    return 'This is an example message from controller';
  }
}
