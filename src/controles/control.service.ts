import { Injectable, NotFoundException } from '@nestjs/common';
import { Control } from './entities/control.entity';
import { Repository } from 'typeorm';
import { CreateControlDto } from './dto/create-control-dto';
import { InjectRepository } from '@nestjs/typeorm';

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
}
