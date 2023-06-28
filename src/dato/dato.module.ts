import { Module } from '@nestjs/common';
import { DatoController } from './dato.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dato } from './dato.entity';
import { DatoService } from './dato.service';

@Module({
  imports: [TypeOrmModule.forFeature([Dato])],
  controllers: [DatoController],
  providers: [DatoService],
})
export class DatoModule {}
