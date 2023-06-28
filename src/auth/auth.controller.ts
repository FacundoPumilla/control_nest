import {
  Body,
  Controller,
  Get,
  Headers,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ControlService } from 'src/controles/control.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly controlService: ControlService) {}
  @Post()
  create(@Body() body, @Headers() headers, @Res() res) {
    console.log('Headers: ', headers);
    console.log('Body: ', body);
    if (headers['token']) {
      return res.status(HttpStatus.OK).json({
        body: body['bat'],
      });
    } else {
      return res.status(HttpStatus.OK).json({
        body: body,
      });
    }
  }
  @Get()
  async show(@Headers() headers, @Res() res) {
    console.log('Headers: ', headers);
    let date = Date.now();
    date = Math.floor(date / 1000) + 10;
    if (!headers['macnumber'] || !headers['imei']) {
      res.status(HttpStatus.FORBIDDEN).json({
        mensaje: 'No accesible',
      });
    } else {
      return this.controlService
        .getForMacNumber(headers['macnumber'])
        .then(async (data) => {
          if (data.isActive) {
            const preHash: string = data.macnumber + data.imei;
            const token = await bcrypt.hash(preHash, 10);
            res.status(HttpStatus.OK).json({
              token: token,
              conn_use: true,
              wifi_ssid: 'ANACONDA',
              wifi_pass: 'fueragatoadentrovibora',
              time_send: 5,
              date: date,
            });
          }
        })
        .catch((err) => {
          res.status(HttpStatus.FORBIDDEN).json(err);
        });
    }
  }
}
