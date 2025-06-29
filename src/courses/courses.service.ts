import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
  ) {}

  async create(courseDto: CreateCourseDto): Promise<Course> {
    const newCourse = this.coursesRepository.create(courseDto);
    return this.coursesRepository.save(newCourse);
  }

  async findAll(): Promise<Course[]> {
    return this.coursesRepository.find();
  }
findModulesByCourseId(courseId: string) {
  return this.coursesRepository.findOne({
    where: { id: courseId },
    relations: ['modules'],
  });
}


async update(id: string, courseDto: UpdateCourseDto): Promise<Course | null> {
  const course = await this.coursesRepository.findOne({ where: { id } });

  if (!course) {
    throw new NotFoundException(`ID ${id} ga teng bo‘lgan kurs topilmadi`);
  }

  await this.coursesRepository.update(id, courseDto);
  return this.coursesRepository.findOne({ where: { id } });
}

  async delete(id: number): Promise<{ message: string }> {
    const result = await this.coursesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }

    return { message: `Course with ID ${id} deleted successfully` };
  }
}
