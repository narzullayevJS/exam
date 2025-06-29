import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { CreateLessonDto } from '../lessons/dto/create-lesson.dto';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/RolesGuard';
import { Roles } from '../auth/decarator/roles.decorator';
import { Request } from 'express';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly service: EnrollmentsService) {}

  // Kursga yozilish (student va teacher uchun ruxsat)
  @Roles('teacher', 'student')
  @Post()
  kursgaYozilish(@Req() req: Request, @Body() dto: CreateEnrollmentDto) {
    const foydalanuvchiId = (req.user as { id: string }).id;
    return this.service.enroll(foydalanuvchiId, dto.courseId);
  }

  // Darsni tugallash
  @Post('complete')
  darsniTugatish(@Req() req: Request, @Body() dto: CreateLessonDto) {
    const foydalanuvchiId = (req.user as { id: string }).id;
    return this.service.completeLesson(foydalanuvchiId, dto.lessonId);
  }

  // Kursdagi yutuqlarni olish
  @Get('progress')
  yutuqlarniOlish(@Req() req: Request) {
    const foydalanuvchiId = (req.user as { id: string }).id;
    return this.service.getProgress(foydalanuvchiId);
  }
}
