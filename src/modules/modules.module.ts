import { Module } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { ModulesController } from './modules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Madule } from './entities/module.entity';
import { Course } from '../courses/entities/course.entity'; // <-- Qo‘shildi

@Module({
  imports: [
    TypeOrmModule.forFeature([Madule, Course]) // <-- IKKALASINI ro‘yxatdan o‘tkazing
  ],
  controllers: [ModulesController],
  providers: [ModulesService],
})
export class ModulesModule {}
