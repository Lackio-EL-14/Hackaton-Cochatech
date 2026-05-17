import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Business } from './business.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string="";

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string="";

  @ManyToMany(() => Business, (business) => business.categories)
  businesses: Business[]=[];
}