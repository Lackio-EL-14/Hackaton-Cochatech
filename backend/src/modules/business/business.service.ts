// h2 y h3
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Business, BusinessStatus } from './entities/business.entity';
import { SearchBusinessDto } from './dto/search-business.dto';

@Injectable()
export class BusinessService {
  constructor(
    @InjectRepository(Business)
    private readonly businessRepository: Repository<Business>,
  ) {}

  async searchApproved(query: SearchBusinessDto): Promise<Business[]> {
    const MAX_RESULTS = 20;

    const builder = this.businessRepository
      .createQueryBuilder('business')
      .leftJoinAndSelect('business.categories', 'category')
      .where('business.status = :status', { status: BusinessStatus.APPROVED })
      .orderBy('business.createdAt', 'DESC'); // Los más nuevos aparecen primero

    if (query.name) {
      builder.andWhere('business.name LIKE :name', { name: `%${query.name}%` });
    }

    if (query.category) {
      builder.andWhere('category.name = :category', { category: query.category });
    }

    builder.take(MAX_RESULTS);

    return builder.getMany();
  }

  async getLightweightPins(): Promise<Partial<Business>[]> {
    return this.businessRepository
      .createQueryBuilder('business')
      .select([
        'business.id',
        'business.name',
        'business.latitude',
        'business.longitude',
        'business.operatingHours',
      ])
      .where('business.status = :status', { status: BusinessStatus.APPROVED })
      .getMany();
  }
}