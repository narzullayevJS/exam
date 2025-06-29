// assignments.controller.ts
import { Controller, Post, Param, Body, ParseIntPipe } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { CurrentUser } from '../auth/decarator/current-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('modules/:moduleId/assignment') 
export class AssignmentsController {
  constructor(private readonly assignmentService: AssignmentsService) {}

  @Post()
  create(
    @Param('moduleId', ParseIntPipe) moduleId: number,
    @Body() body: CreateAssignmentDto,
    @CurrentUser() user: User,
  ) {
    return this.assignmentService.create(moduleId, body, user);
  }
}
