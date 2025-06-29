// results.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assignment } from 'src/assignments/entities/assignment.entity';
import { ResultsService } from './results.service';
import { ResultsController } from './results.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Assignment])],
  controllers: [ResultsController],
  providers: [ResultsService],
})
export class ResultsModule {}
