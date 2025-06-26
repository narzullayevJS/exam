import { IsEmail, IsNotEmpty, IsEnum } from 'class-validator';
import { UserRole } from '../../users/entities/user.entity';

export class RegisterDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
}