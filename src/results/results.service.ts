import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Assignment } from 'src/assignments/entities/assignment.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ResultsService {
  constructor(
    @InjectRepository(Assignment)
    private assignmentRepo: Repository<Assignment>,
  ) {}

  async findForUser(user: User) {
    return this.assignmentRepo.find({
      where: { student: { id: user.id } },
      relations: ['module'],
    });
  }
}
