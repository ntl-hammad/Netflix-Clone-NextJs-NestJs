import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column({ default: 'user' })
  role: string;

  @Column({ nullable: true, type: 'text' })
  resetToken: string | null;

  @Column({ type: 'timestamp', nullable: true })
  resetTokenExpiry: Date | null;

  @Column({ default: 'active' })
  status: string;

  @CreateDateColumn()
  datetime: Date;
}
