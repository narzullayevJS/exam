// modules.controller.ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { CreateModuleDto } from './dto/create-module.dto';

@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Post()
  createModule(@Body() createModuleDto: CreateModuleDto) {
    return this.modulesService.create(createModuleDto);
  }

  @Get(':moduleId/lessons')
  getLessons(@Param('moduleId') moduleId: string) {
    return this.modulesService.findLessonsByModuleId(+moduleId);
  }
} 
