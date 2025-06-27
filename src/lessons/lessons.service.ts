// lessons/lessons.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { Repository } from 'typeorm';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Madule } from 'src/modules/entities/module.entity';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private lessonRepo: Repository<Lesson>,

    @InjectRepository(Madule)
    private moduleRepo: Repository<Madule>,
  ) {}

  async create(dto: CreateLessonDto): Promise<Lesson> {
    const module = await this.moduleRepo.findOne({ where: { id: dto.moduleId } });
    if (!module) throw new NotFoundException(`Module with ID ${dto.moduleId} not found`);

    const lesson = this.lessonRepo.create({ ...dto, module });
    return this.lessonRepo.save(lesson);
  }

  findAll(): Promise<Lesson[]> {
    return this.lessonRepo.find({ relations: ['module'] });
  }

  async findOne(id: number): Promise<Lesson> {
    const lesson = await this.lessonRepo.findOne({ where: { id }, relations: ['module'] });
    if (!lesson) throw new NotFoundException(`Lesson with ID ${id} not found`);
    return lesson;
  }

  async update(id: number, dto: UpdateLessonDto): Promise<Lesson> {
    const lesson = await this.lessonRepo.findOne({ where: { id } });
    if (!lesson) throw new NotFoundException(`Lesson with ID ${id} not found`);

    if (dto.moduleId) {
      const module = await this.moduleRepo.findOne({ where: { id: dto.moduleId } });
      if (!module) throw new NotFoundException(`Module with ID ${dto.moduleId} not found`);
      lesson.module = module;
    }

    Object.assign(lesson, dto);
    return this.lessonRepo.save(lesson);
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.lessonRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Lesson with ID ${id} not found`);
    return { message: `Lesson with ID ${id} deleted successfully` };
  }
}
