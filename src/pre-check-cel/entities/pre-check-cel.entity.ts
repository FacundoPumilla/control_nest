import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
export class PreCheckCel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  numberPhone: string;

  @Column()
  token: number;

  @Column()
  intentos: number;

  @Column()
  created_at: Date;

  @Column()
  confirmed: boolean;
}
