import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateModuleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  courseId: string;
}
