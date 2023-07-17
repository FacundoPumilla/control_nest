export class CreatePreCheckCelDto {
  readonly numberPhone: string;
  readonly token?: number;
  readonly intentos?: number;
  readonly confirmed?: boolean;
  readonly created_at: Date;
}
