import { ApiProperty } from '@nestjs/swagger';

export class CreateAssignmentDto {
  @ApiProperty({ example: 'My answer to assignment' })
  answer: string;
}
