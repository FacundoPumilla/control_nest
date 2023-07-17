import { PartialType } from '@nestjs/mapped-types';
import { CreatePreCheckCelDto } from './create-pre-check-cel.dto';

export class UpdatePreCheckCelDto extends PartialType(CreatePreCheckCelDto) {}
