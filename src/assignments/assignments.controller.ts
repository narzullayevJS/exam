// assignments/assignments.controller.ts
import { Controller, Post, Param, Body, ParseIntPipe, Req, UseGuards } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard'; 
import { Request } from 'express';

@Controller('modules/:moduleId/assignment')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

@UseGuards(JwtAuthGuard)
@Post()
create(
  @Param('moduleId', ParseIntPipe) moduleId: number,
  @Body() dto: CreateAssignmentDto,
  @Req() req: any,
) {
  const userId = req.user['userId'];
  return this.assignmentsService.create(moduleId, dto, userId);
}
}
