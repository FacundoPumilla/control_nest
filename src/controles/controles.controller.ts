import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreateControlDto } from './dto/create-control-dto/create-control-dto';
import { ControlService } from './control.service';

@Controller('controles')
export class ControlesController {
  constructor(private readonly constrolService: ControlService) {}

  @Post()
  create(@Body() _createControlDto: CreateControlDto, @Res() response) {
    return this.constrolService
      .createControl(_createControlDto)
      .then((control) => {
        response.status(HttpStatus.CREATED).json(control);
      })
      .catch(() => {
        response
          .status(HttpStatus.FORBIDDEN)
          .json({ mensaje: 'Error al crear el control' });
      });
  }

  @Get()
  getAll(@Res() response) {
    return this.constrolService
      .getAll()
      .then((controlList) => {
        response.status(HttpStatus.OK).json(controlList);
      })
      .catch(() => {
        response
          .status(HttpStatus.FORBIDDEN)
          .json({ mensaje: 'error en la obtencion de controles' });
      });
  }

  @Put(':id')
  update(
    @Body() _updateControl: CreateControlDto,
    @Res() response,
    @Param('id') idControl,
  ) {
    this.constrolService
      .updateControl(idControl, _updateControl)
      .then((control) => {
        response.status(HttpStatus.OK).json(control);
      })
      .catch(() => {
        response
          .status(HttpStatus.FORBIDDEN)
          .json({ response: 'error actualizando el control' });
      });
  }

  @Delete(':id')
  delete(@Res() response, @Param('id') idControl) {
    this.constrolService
      .deleteControl(idControl)
      .then((res) => {
        response.status(HttpStatus.OK).json(res);
      })
      .catch(() => {
        response
          .status(HttpStatus.FORBIDDEN)
          .json({ mensaje: 'error al borrar el control' });
      });
  }

  @Get(':id')
  getOne(@Res() response, @Param('id') idControl) {
    this.constrolService
      .getOne(idControl)
      .then((control) => {
        response.status(HttpStatus.OK).json(control);
      })
      .catch(() => {
        response
          .status(HttpStatus.FORBIDDEN)
          .json({ mensaje: 'Control no encontrado' });
      });
  }
}
