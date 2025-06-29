// modules.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Madule } from './entities/module.entity';
import { Repository } from 'typeorm';
import { CreateModuleDto } from './dto/create-module.dto';
import { Course } from '../courses/entities/course.entity';

@Injectable()
export class ModulesService {
  constructor(
    @InjectRepository(Madule)
    private moduleRepo: Repository<Madule>,
    @InjectRepository(Course)
    private courseRepo: Repository<Course>,
  ) {}

  async create(createModuleDto: CreateModuleDto): Promise<Madule> {
    const { title, courseId } = createModuleDto;

    const course = await this.courseRepo.findOne({ where: { id: courseId } });
    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }

    const newModule = this.moduleRepo.create({
      title,
      course, 
    });

    return this.moduleRepo.save(newModule);
  }

  findLessonsByModuleId(moduleId: number) {
    return this.moduleRepo.findOne({
      where: { id: moduleId },
      relations: ['lessons'],
    });
  }
}
