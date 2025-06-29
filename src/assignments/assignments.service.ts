// assignments/assignments.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Assignment } from './entities/assignment.entity';
import { Repository } from 'typeorm';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { Madule } from 'src/modules/entities/module.entity';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectRepository(Assignment)
    private assignmentRepo: Repository<Assignment>,
    @InjectRepository(Madule)
    private moduleRepo: Repository<Madule>,
  ) {}

  async create(moduleId: number, dto: CreateAssignmentDto, userId: number) {
    const module = await this.moduleRepo.findOne({ where: { id: moduleId } });
    if (!module) {
      throw new NotFoundException('Module not found');
    }

    const assignment = this.assignmentRepo.create({
      ...dto,
      module,
      userId,
    });

    return this.assignmentRepo.save(assignment);
  }
}
