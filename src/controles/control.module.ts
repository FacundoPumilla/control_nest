import { Module } from '@nestjs/common';
import { ControlService } from './control.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Control } from './entities/control.entity';
import { ControlesController } from './controles.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Control])],
  controllers: [ControlesController],
  providers: [ControlService],
  exports: [ControlService],
})
export class ControlModule {}
