import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 255 })
  email: string;

  @Column({ name: 'password_hash', length: 255 })
  passwordHash: string;

  @Column({ type: 'enum', enum: ['ADMIN', 'ENTREPRENEUR'] })
  role: string;

  @Column({ name: 'is_premium', default: false })
  isPremium: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
