import { Dato } from 'src/dato/dato.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Control {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  macnumber: string;

  @Column()
  imei: string;

  @Column({ default: 'NoToken' })
  token: string;

  @Column('boolean', {
    default: false,
  })
  isActive: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Dato, (dato) => dato.control)
  datos: Dato;
}
