import { Module } from '@nestjs/common';
import { PreCheckCelService } from './pre-check-cel.service';
import { PreCheckCelController } from './pre-check-cel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreCheckCel } from './entities/pre-check-cel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PreCheckCel])],
  controllers: [PreCheckCelController],
  providers: [PreCheckCelService],
})
export class PreCheckCelModule {}
