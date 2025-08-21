import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('info')
  getInfo() {
    return this.appService.getCompany();
  }

  @Post('chat')
  chat(@Body('messages') messages: { role: string; content: string }[]) {
    return this.appService.chat(messages);
  }
}
