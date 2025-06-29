// course.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Madule } from '../../modules/entities/module.entity';
import { Enrollment } from 'src/enrollments/entities/enrollment.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal')
  price: number;

  @Column()
  teacher: string;

  @Column()
  category: string;

  @Column()
  level: string;

  @OneToMany(() => Madule, module => module.course, { cascade: true })
  modules: Madule[];

    @ManyToOne(() => Enrollment, enrollment => enrollment.course)
    enrollment: Enrollment;
}
