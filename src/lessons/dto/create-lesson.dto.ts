import { IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateLessonDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @Type(() => Number)
  @IsNumber()
  moduleId: number;
}