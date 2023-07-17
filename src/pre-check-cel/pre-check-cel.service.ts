import { Injectable } from '@nestjs/common';
import { CreatePreCheckCelDto } from './dto/create-pre-check-cel.dto';
import { UpdatePreCheckCelDto } from './dto/update-pre-check-cel.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PreCheckCel } from './entities/pre-check-cel.entity';
import { Repository, TypeORMError } from 'typeorm';

@Injectable()
export class PreCheckCelService {
  constructor(
    @InjectRepository(PreCheckCel)
    private preCheckCelRepository: Repository<PreCheckCel>,
  ) {}

  async create(createPreCheckCelDto: CreatePreCheckCelDto) {
    try {
      if (createPreCheckCelDto.numberPhone) {
        const preNewCheck = await this.findOne(
          createPreCheckCelDto.numberPhone,
        );
        const newPreCheckCel = new PreCheckCel();
        if (!preNewCheck) {
          newPreCheckCel.numberPhone = createPreCheckCelDto.numberPhone;
          newPreCheckCel.confirmed = false;
          newPreCheckCel.created_at = new Date();
          newPreCheckCel.token = Math.floor(100000 + Math.random() * 900000);
          newPreCheckCel.intentos = 0;
          return await this.preCheckCelRepository.save(newPreCheckCel);
        } else {
          return preNewCheck;
        }
      } else {
        return 'Debe ingresar un numero valido';
      }
    } catch (error) {
      throw new TypeORMError(error);
    }
  }

  async findAll() {
    const allpreCheckCel = await this.preCheckCelRepository.find();
    return allpreCheckCel;
  }

  async findOne(id: string) {
    const celCheck: PreCheckCel = await this.preCheckCelRepository.findOneBy({
      numberPhone: id,
    });
    return celCheck;
  }

  async update(updatePreCheckCelDto: UpdatePreCheckCelDto) {
    if (updatePreCheckCelDto.token && updatePreCheckCelDto.numberPhone) {
      const checkToken = await this.findOne(updatePreCheckCelDto.numberPhone);
      if (checkToken.token != updatePreCheckCelDto.token) {
        checkToken.intentos++;
        return await this.preCheckCelRepository.save(checkToken);
      } else {
        checkToken.confirmed = true;
        return await this.preCheckCelRepository.save(checkToken);
      }
    }
    return 'Token is not present';
  }

  remove(id: number) {
    return `This action removes a #${id} preCheckCel`;
  }
}
