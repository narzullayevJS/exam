import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Assignment } from './entities/assignment.entity';
import { Repository } from 'typeorm';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { User } from 'src/users/entities/user.entity';
import { Madule } from 'src/modules/entities/module.entity';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectRepository(Assignment)
    private assignmentRepo: Repository<Assignment>,

    @InjectRepository(Madule)
    private moduleRepo: Repository<Madule>,
  ) {}

  async create(moduleId: number, dto: CreateAssignmentDto, student: User) {
    const module = await this.moduleRepo.findOneByOrFail({ id: moduleId });

    const assignment = this.assignmentRepo.create({
      answer: dto.answer,
      module,
      student,
      status: 'pending',
    });

    return this.assignmentRepo.save(assignment);
  }
}
