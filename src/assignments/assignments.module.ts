import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignmentsController } from './assignments.controller';
import { AssignmentsService } from './assignments.service';
import { Assignment } from './entities/assignment.entity';
import { Madule } from 'src/modules/entities/module.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Assignment, Madule])],
  controllers: [AssignmentsController],
  providers: [AssignmentsService],
  exports: [AssignmentsService],
})
export class AssignmentsModule {}
