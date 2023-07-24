import { Module } from '@nestjs/common';
import { ControlService } from './control.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Control } from './control.entity';
import { ControlesController } from './controles.controller';
import { FromControlDto } from './fromControlDto';

@Module({
  imports: [TypeOrmModule.forFeature([Control])],
  controllers: [ControlesController],
  providers: [ControlService, FromControlDto],
  exports: [ControlService],
})
export class ControlModule {}
