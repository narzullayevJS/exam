// dto/create-course.dto.ts
import { IsString, IsNumber } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsString()
  teacher: string;

  @IsString()
  category: string;

  @IsString()
  level: string;
}
