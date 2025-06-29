import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Course } from 'src/courses/entities/course.entity';
import { CompletedLesson } from '../../lessons/entities/complate.lesson.entity';

@Entity()
export class Enrollment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.enrollments)
  student: User;

  @ManyToOne(() => Course, course => course.enrollment)
  course: Course;

  @OneToMany(() => CompletedLesson, cl => cl.enrollment)
  completedLessons: CompletedLesson[]; // ✅ ShU MAYDON BO‘LISHI SHART
}
