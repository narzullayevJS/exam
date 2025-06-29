import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity'; // foydalanuvchi modeli
import { Madule } from 'src/modules/entities/module.entity'; // kurs moduli

@Entity()
export class Assignment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.assignments)
  student: User;

  @ManyToOne(() => Madule, (module) => module.assignments)
  module: Madule;

  @Column('text')
  answer: string;

  @Column({ type: 'int', nullable: true })
  score: number;

  @Column({ default: 'pending' })
  status: 'pending' | 'graded';

  @Column({ nullable: true })
  gradedBy: string;

  @CreateDateColumn()
  submittedAt: Date;
}
