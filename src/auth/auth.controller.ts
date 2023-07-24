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
import { FromControlDto } from 'src/controles/fromControlDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly controlService: ControlService) {}
  @Post()
  async create(@Body() body, @Headers() headers, @Res() res) {
    console.log('Headers: ', headers);
    console.log('Body: ', body);
    if (headers['imei'] && headers['macnumber']) {
      const control = await this.controlService.getForMacNumber(
        headers['macnumber'],
      );
      if (control) {
        const hash = headers['macnumber'] + headers['imei'];
        const validToken = await bcrypt.compare(hash, control.token);
        if (validToken)
          return res.status(HttpStatus.OK).json(control.updated_at);
      } else {
        return res.status(HttpStatus.OK).json({
          error: 'macumber ' + headers['macnumber'] + ' is inactive',
        });
      }
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
            const saltOrRounds = 10;
            const preHash: string = data.macnumber + data.imei;
            const token = await bcrypt.hash(preHash, saltOrRounds);
            const ControlAtUpdate = new FromControlDto(
              data.macnumber,
              data.imei,
              token,
            );
            const result = await this.controlService.updateFromControl(
              ControlAtUpdate,
            );
            res.status(HttpStatus.OK).json({
              token: token,
              conn_use: true,
              wifi_ssid: 'ANACONDA',
              wifi_pass: 'fueragatoadentrovibora',
              time_send: 5,
              date: date,
              update: {
                result,
              },
            });
          }
        })
        .catch((err) => {
          res.status(HttpStatus.FORBIDDEN).json(err);
        });
    }
  }
}
