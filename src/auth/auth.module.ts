import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ControlService } from 'src/controles/control.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Control } from 'src/controles/control.entity';
import { FromControlDto } from 'src/controles/fromControlDto';

@Module({
  imports: [TypeOrmModule.forFeature([Control])],
  controllers: [AuthController],
  providers: [ControlService],
})
export class AuthModule {}
