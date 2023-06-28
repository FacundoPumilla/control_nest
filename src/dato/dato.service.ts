import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dato } from './dato.entity';
import { Repository } from 'typeorm';
import { createDatoDto } from './dato-create.dto';

@Injectable()
export class DatoService {
  constructor(
    @InjectRepository(Dato)
    private datoRepository: Repository<Dato>,
  ) {}

  async getAll(): Promise<Dato[]> {
    return await this.datoRepository.find();
  }
  async getOne(idDato: number): Promise<Dato> {
    try {
      const dato = await this.datoRepository.findOne({
        where: {
          id: idDato,
        },
      });
      if (dato) {
        return dato;
      }
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Dato no encontrado -> dato.service');
    }
  }
  async createDato(datoNuevo: createDatoDto): Promise<Dato> {
    try {
      const newDato = new Dato();
      newDato.siw = datoNuevo.siw;
      newDato.sig = datoNuevo.sig;
      newDato.te = datoNuevo.te;
      newDato.r1 = datoNuevo.r1;
      newDato.r2 = datoNuevo.r2;
      newDato.err = datoNuevo.err;
      return this.datoRepository.save(newDato);
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Imposible crear el dato -> dato.service');
    }
  }
  async DeleteDateColumn(idDato: number): Promise<Dato> {
    try {
      const dato = this.datoRepository.findOneOrFail({
        where: {
          id: idDato,
        },
      });
      if (dato) return dato;
      else throw new NotFoundException('no se encontro');
    } catch (error) {
      console.log(error);
      throw new NotFoundException('error en service.dato');
    }
  }
}
