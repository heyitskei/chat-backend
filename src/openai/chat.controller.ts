import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @HttpCode(200)
  async getResponse(@Body('message') message: string): Promise<string> {
    await this.chatService.saveMessage(message, 'user');

    const response = await this.chatService.getChatResponse(message);

    await this.chatService.saveMessage(response, 'bot');

    return response;
  }
}
