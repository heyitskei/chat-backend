import { Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
  getTestMessage(): string {
    return 'Test endpoint works!';
  }
}
