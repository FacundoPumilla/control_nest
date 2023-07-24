import { Control } from 'src/controles/control.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Dato {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  siw: number;

  @Column()
  sig: number;

  @CreateDateColumn()
  created_at: Date;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  te: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  vo: number;

  @Column()
  r1: boolean;

  @Column()
  r2: boolean;

  @Column()
  err: number;

  @ManyToOne(() => Control, (control) => control.id)
  control: Control;
}
