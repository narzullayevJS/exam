import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Module } from '../../modules/entities/module.entity';
@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => Module, module => module.lessons)
  module: Module;
}
