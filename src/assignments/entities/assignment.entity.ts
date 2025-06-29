import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Madule } from 'src/modules/entities/module.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Assignment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  content: string;

  @Column({ nullable: true })
  fileUrl: string;

  @CreateDateColumn()
  submittedAt: Date;

  @ManyToOne(() => Madule, (module) => module.id, { eager: false })
  module: Madule;

    @ManyToOne(() => User, (user) => user.assignments)
  student: User; // 🟢 Mana shu bo‘lishi shart!
}
