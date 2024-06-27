import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './openai/chat.module';
import { TestModule } from './test.module';

@Module({
  imports: [ChatModule, TestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
