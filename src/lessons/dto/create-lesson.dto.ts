import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateLessonDto {
  @IsString()
  lessonId: string

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @Type(() => Number)
  @IsNumber()
  moduleId: number;
}