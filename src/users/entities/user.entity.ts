import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Assignment } from 'src/assignments/entities/assignment.entity'; // import qilish muhim
import { Madule } from 'src/modules/entities/module.entity';
import { Enrollment } from 'src/enrollments/entities/enrollment.entity';

export enum UserRole {
  STUDENT = 'student',
  TEACHER = 'teacher',
  ADMIN = 'admin',
}

@Entity({ name: 'Users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.STUDENT })
  role: UserRole;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

 @ManyToOne(() => Madule, (module) => module.assignments)
  module: Madule;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }

  @OneToMany(() => Assignment, (assignment) => assignment.student)
  assignments: Assignment[];


  @OneToMany(() => Enrollment, (enrollment) => enrollment.student)
enrollments: Enrollment[];
}
