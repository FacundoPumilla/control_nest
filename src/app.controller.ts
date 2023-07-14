import {
  Body,
  Controller,
  Get,
  Headers,
  HttpStatus,
  Ip,
  Res,
} from '@nestjs/common';
import { ControlService } from './controles/control.service';
import { exec } from 'child_process';

@Controller()
export class AppController {
  constructor(
    // private readonly appService: AppService,
    private readonly controlController: ControlService,
  ) {}

  @Get()
  async getHello(
    @Ip() ip,
    @Res() response,
    @Headers('macnumber') req,
    @Body() body,
  ) {
    // console.log(req, body, Date.now().toLocaleString());
    // const getMacNumber = await this.controlController
    //   .getForMacNumber(req)
    //   .then((data) => {
    //     if (data.isActive) {
    //       response.status(HttpStatus.OK).json(data);
    //     } else response.status(HttpStatus.NOT_ACCEPTABLE).json(data);
    //   })
    //   .catch((err) => {
    //     response.status(HttpStatus.FORBIDDEN).json({
    //       mensaje: 'el numero mac no se encontro -app.controller' + err,
    //     });
    //   });

    const nph: string = body['number'];
    const tph: string = body['text'];
    console.log('numero:', nph + 'texto:', tph);
    const comm = `gammu sendsms text ${nph}  -text "${tph}"`;
    console.log(comm);
    const ejec = exec(comm, (err, out, stderr) => {
      if (err) console.log(err);
      if (stderr) console.log(stderr);
      if (out) console.log(out);
      else console.log(ejec);
    });
    response.json({ mensaje: 'Obteniendo datos desde aca', body });
  }
}
