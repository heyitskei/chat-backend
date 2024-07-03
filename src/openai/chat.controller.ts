import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Message } from '@prisma/client';

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

  @Get('/messages')
  async getAllMessages(): Promise<Message[]> {
    return this.chatService.getAllMessages();
  }
}
