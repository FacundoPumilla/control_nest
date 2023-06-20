import { Dato } from 'src/dato/dato';
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

  @Column({
    default: false,
  })
  isActive: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Dato, (dato) => dato.control)
  datos: Dato[];
}
