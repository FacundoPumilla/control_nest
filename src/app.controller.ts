import { Controller, Get, Ip, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Ip() ip, @Res() response): any {
    console.log(ip);
    response.json({ mensaje: 'Obteniendo datos desde' + ip });
  }
}
