import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { DatoService } from './dato.service';
import { createDatoDto } from './dato-create.dto';

const tim = Date.now().toString();

@Controller('dato')
export class DatoController {
  constructor(private readonly datoService: DatoService) {}

  @Post()
  create(@Body() crateDto: createDatoDto, @Res() response) {
    return this.datoService
      .createDato(crateDto)
      .then((dato) => {
        response.status(HttpStatus.CREATED).json(dato);
      })
      .catch(() => {
        response.status(HttpStatus.FORBIDDEN).json({
          mensaje: 'error al crear el mensaje',
        });
      });
  }
  @Get('id')
  getLimit10ById(@Res() response, @Query() id: number): any {
    console.log(id + ' ' + 'time-> ' + tim);
    return this.datoService
      .getOne(id['id'])
      .then((listControl) => {
        response.status(HttpStatus.OK).json(listControl);
      })
      .catch(() => {
        response
          .status(HttpStatus.FORBIDDEN)
          .json({ mesnsaje: 'No se encontro el id' });
      });
  }
  @Get()
  getAll(@Res() response, @Param() id: any) {
    return this.datoService
      .getAll()
      .then((datosList) => {
        console.log(id + ' EL getall _time-> ' + tim);
        response.status(HttpStatus.OK).json({ id, datosList });
      })
      .catch(() => {
        response
          .status(HttpStatus.FORBIDDEN)
          .json({ mensaje: 'Imposible retornar los datos' });
      });
  }
}
