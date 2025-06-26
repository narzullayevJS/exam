import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { Course } from './entities/course.entity';
import { Roles } from 'src/auth/decarator/roles.decorator';
import { RolesGuard } from 'src/auth/guards/RolesGuard';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

@Post()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
async create(@Body() courseDto: CreateCourseDto): Promise<Course> {
  return this.coursesService.create(courseDto);
}

   @Get()
  async findAll(): Promise<Course[]> {
    return this.coursesService.findAll();
  }

@Patch(':id')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
async update(@Param('id') id: string, @Body() courseDto: UpdateCourseDto): Promise<Course | null> {
  return this.coursesService.update(+id, courseDto);
}

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Delete(':id')
async delete(@Param('id') id: string): Promise<{ message: string }> {
  return this.coursesService.delete(+id);
}
}
