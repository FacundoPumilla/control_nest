import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PreCheckCelService } from './pre-check-cel.service';
import { CreatePreCheckCelDto } from './dto/create-pre-check-cel.dto';
import { UpdatePreCheckCelDto } from './dto/update-pre-check-cel.dto';

@Controller('pre-check-cel')
export class PreCheckCelController {
  constructor(private readonly preCheckCelService: PreCheckCelService) {}

  @Post()
  create(@Body() createPreCheckCelDto: CreatePreCheckCelDto) {
    return this.preCheckCelService.create(createPreCheckCelDto);
  }

  @Get()
  findAll() {
    return this.preCheckCelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.preCheckCelService.findOne(id);
  }

  @Patch()
  update(@Body() updatePreCheckCelDto: UpdatePreCheckCelDto) {
    return this.preCheckCelService.update(updatePreCheckCelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.preCheckCelService.remove(+id);
  }
}
