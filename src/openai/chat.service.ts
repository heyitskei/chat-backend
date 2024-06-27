import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ChatService {
  async getChatResponse(message: string): Promise<string> {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is not set');
    }

    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    try {
      const response = await axios.post(
        apiUrl,
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: message }],
          max_tokens: 150,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error(
        'Error fetching response from OpenAI:',
        error.response?.data || error.message,
      );
      throw new Error('Failed to fetch response from OpenAI');
    }
  }
}
