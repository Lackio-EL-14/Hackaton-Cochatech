import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  ManyToMany, 
  JoinTable 
} from 'typeorm';
import { Category } from './category.entity';

export enum BusinessStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export enum SalesType {
  VIRTUAL = 'VIRTUAL',
  PRESENCIAL = 'PRESENCIAL',
  AMBOS = 'AMBOS',
}

@Entity('businesses')
export class Business {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', type: 'char', length: 36 })
  userId: string="";

  @Column({ type: 'varchar', length: 150 })
  name: string="";

  @Column({ type: 'text' })
  description: string="";

  @Column({ type: 'decimal', precision: 10, scale: 8 })
  latitude: number=0;

  @Column({ type: 'decimal', precision: 11, scale: 8 })
  longitude: number=0;

  @Column({ name: 'sales_type', type: 'enum', enum: SalesType })
  salesType: SalesType=SalesType.AMBOS;

  @Column({ name: 'contact_phone', type: 'varchar', length: 20 })
  contactPhone: string="";

  @Column({ name: 'operating_hours', type: 'json' })
  operatingHours: Record<string, any>={};

  @Column({ type: 'enum', enum: BusinessStatus, default: BusinessStatus.PENDING })
  status: BusinessStatus=BusinessStatus.PENDING;

  @Column({ name: 'rejection_reason', type: 'text', nullable: true })
  rejectionReason: string | null=null;

  @ManyToMany(() => Category, (category) => category.businesses)
  @JoinTable({
    name: 'business_categories',
    joinColumn: { name: 'business_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' },
  })
  categories: Category[];
}