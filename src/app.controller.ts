import { Controller, Get, Headers, HttpStatus, Ip, Res } from '@nestjs/common';
import { ControlService } from './controles/control.service';

@Controller()
export class AppController {
  constructor(
    // private readonly appService: AppService,
    private readonly controlController: ControlService,
  ) {}

  @Get()
  async getHello(@Ip() ip, @Res() response, @Headers('macnumber') req) {
    console.log(req);
    const getMacNumber = await this.controlController
      .getForMacNumber(req)
      .then((data) => {
        if (data.isActive) {
          response.status(HttpStatus.OK).json(data);
        } else response.status(HttpStatus.NOT_ACCEPTABLE).json(data);
      })
      .catch((err) => {
        response.status(HttpStatus.FORBIDDEN).json({
          mensaje: 'el numero mac no se encontro -app.controller' + err,
        });
      });
    console.log(getMacNumber);
    // response.json({ mensaje: 'Obteniendo datos desde aca' + req });
  }
}
