import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from '../enrollments/entities/enrollment.entity';
import { Course } from '../courses/entities/course.entity';
import { User } from '../users/entities/user.entity';
import { Lesson } from '../lessons/entities/lesson.entity';
import { CompletedLesson } from '../lessons/entities/complate.lesson.entity';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectRepository(Enrollment) private enrollmentRepo: Repository<Enrollment>,
    @InjectRepository(Course) private courseRepo: Repository<Course>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Lesson) private lessonRepo: Repository<Lesson>,
  ) {}

  async enroll(userId: string, courseId: string) {
    const user = await this.userRepo.findOneBy({ id: userId });
    const course = await this.courseRepo.findOneBy({ id: courseId });

    if (!user || !course) throw new NotFoundException('Foydalanuvchi yoki kurs topilmadi');

    const alreadyEnrolled = await this.enrollmentRepo.findOne({
      where: { student: { id: userId }, course: { id: courseId } },
    });

    if (alreadyEnrolled) throw new ConflictException('Siz allaqachon ushbu kursga yozilgansiz');

    const enrollment = this.enrollmentRepo.create({ student: user, course });
    await this.enrollmentRepo.save(enrollment);

    return { message: 'Kursga muvaffaqiyatli yozildingiz', enrollment };
  }

  async completeLesson(userId: string, lessonId: string) {
    const lesson = await this.lessonRepo.findOneBy({ id: lessonId });
    if (!lesson) throw new NotFoundException('Dars topilmadi');

    const enrollment = await this.enrollmentRepo.findOne({
      where: { student: { id: userId } },
      relations: ['completedLessons', 'completedLessons.lesson'],
    });

    if (!enrollment) throw new NotFoundException('Siz hech qaysi kursga yozilmagansiz');

    const isCompleted = enrollment.completedLessons.some(cl => cl.lesson.id === lessonId);
    if (isCompleted) return { message: 'Bu dars allaqachon bajarilgan' };

    const completed = this.enrollmentRepo.manager.create(CompletedLesson, {
      enrollment,
      lesson,
      completed_at: new Date(),
    });

    await this.enrollmentRepo.manager.save(CompletedLesson, completed);

    return { message: 'Dars bajarildi deb belgilandi' };
  }

  async getProgress(userId: string) {
    const enrollments = await this.enrollmentRepo.find({
      where: { student: { id: userId } },
      relations: ['course', 'completedLessons'],
    });

    return { message: 'Sizning kurslaringiz va yutuqlaringiz', enrollments };
  }
}
