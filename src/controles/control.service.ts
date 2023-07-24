import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Control } from './control.entity';
import { Repository } from 'typeorm';
import { CreateControlDto } from './create-control-dto';
import { FromControlDto } from './fromControlDto';

@Injectable()
export class ControlService {
  constructor(
    @InjectRepository(Control)
    private controlRepository: Repository<Control>,
  ) {}

  async getAll(): Promise<Control[]> {
    return await this.controlRepository.find();
  }
  async createControl(controlNuevo: CreateControlDto): Promise<Control> {
    const newControl = new Control();
    newControl.macnumber = controlNuevo.macnumber;
    newControl.imei = controlNuevo.imei;
    return this.controlRepository.save(newControl);
  }
  async updateControl(
    idControl: number,
    controlActualiza: CreateControlDto,
  ): Promise<Control> {
    const newControl = await this.controlRepository.findOne({
      where: {
        id: idControl,
      },
    });
    newControl.macnumber = controlActualiza.macnumber;
    return this.controlRepository.save(newControl);
  }
  async updateFromControl(fromControlDto: FromControlDto): Promise<Control> {
    try {
      const controlNew = await this.controlRepository.findOne({
        where: {
          macnumber: fromControlDto.macnumber,
        },
      });
      if (controlNew) {
        controlNew.token = fromControlDto.token;
        return this.controlRepository.save(controlNew);
      }
    } catch (error) {
      throw new NotFoundException('No se encontro imei');
    }
  }
  async deleteControl(idControl: number): Promise<any> {
    const newControl = await this.controlRepository.findOne({
      where: {
        id: idControl,
      },
    });
    if (newControl) {
      return this.controlRepository.remove(newControl);
    }
    throw new NotFoundException('No existe el control');
  }
  async getOne(idControl: number): Promise<Control> {
    const control = await this.controlRepository.findOne({
      where: {
        id: idControl,
      },
    });
    console.log(control);
    if (control) {
      return control;
    }
    throw new NotFoundException('Control no encontrado');
  }
  async getForMacNumber(macnumber: string): Promise<Control> {
    try {
      const mac = await this.controlRepository.findOne({
        where: {
          macnumber: macnumber,
        },
      });
      if (mac) return mac;
    } catch (error) {
      console.log('error en el servico -> ' + error);
      return error;
    }
  }
  async changeControlisActive(idControl: number): Promise<Control> {
    const change = await this.controlRepository.findOne({
      where: {
        id: idControl,
      },
    });
    console.log('Estado anterior del control -> ' + change.isActive);
    if (change.isActive) {
      change.isActive = false;
      return this.controlRepository.save(change);
    } else {
      change.isActive = true;
      return this.controlRepository.save(change);
    }
  }
}
