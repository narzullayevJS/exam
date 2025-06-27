import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Madule } from '../../modules/entities/module.entity';
@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => Madule, module => module.lessons)
  module: Madule;
}
