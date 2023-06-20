import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { DatoService } from './dato.service';
import { createDatoDto } from './dato-create.dto';

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
  @Get()
  getAll(@Res() response) {
    return this.datoService
      .getAll()
      .then((datosList) => {
        response.status(HttpStatus.OK).json(datosList);
      })
      .catch(() => {
        response
          .status(HttpStatus.FORBIDDEN)
          .json({ mensaje: 'Imposible retornar los datos' });
      });
  }
}
