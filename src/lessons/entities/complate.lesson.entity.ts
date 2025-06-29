import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Lesson } from './lesson.entity';
import { Enrollment } from '../../enrollments/entities/enrollment.entity';

@Entity()
export class CompletedLesson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Lesson)
  lesson: Lesson;

  @ManyToOne(() => Enrollment, enrollment => enrollment.completedLessons)
  enrollment: Enrollment;

  @CreateDateColumn()
  completed_at: Date;
}
