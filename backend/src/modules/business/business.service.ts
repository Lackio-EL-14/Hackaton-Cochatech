// h2 y h3
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Business, BusinessStatus } from './entitites/business.entity'
import { SearchBusinessDto } from './dto/search-business.dto';
import { CreateBusinessDto } from './dto/create-business.dto';
import { Category } from './entitites/category.entity';

@Injectable()
export class BusinessService {
  constructor(
    @InjectRepository(Business)
    private readonly businessRepository: Repository<Business>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async upsertBusinessProfile(userId: string, dto: CreateBusinessDto): Promise<Business> {
    const categories = await this.categoryRepository.findBy({
      id: In(dto.categoryIds),
    });

    if (categories.length !== dto.categoryIds.length) {
      throw new BadRequestException('Una o más categorías enviadas no existen en el sistema.');
    }

    let business = await this.businessRepository.findOne({ 
      where: { userId },
      relations: ['categories'] 
    });

    if (business) {
      this.businessRepository.merge(business, {
        name: dto.name,
        description: dto.description,
        latitude: dto.latitude,
        longitude: dto.longitude,
        salesType: dto.salesType,
        contactPhone: dto.contactPhone,
        operatingHours: dto.operatingHours,
        categories: categories, 
        status: BusinessStatus.PENDING, 
        rejectionReason: null, 
      });
    } else {
      business = this.businessRepository.create({
        userId, 
        name: dto.name,
        description: dto.description,
        latitude: dto.latitude,
        longitude: dto.longitude,
        salesType: dto.salesType,
        contactPhone: dto.contactPhone,
        operatingHours: dto.operatingHours,
        categories: categories,
        status: BusinessStatus.PENDING, 
      });
    }

    return this.businessRepository.save(business);
  }

  async searchApproved(query: SearchBusinessDto): Promise<Business[]> {
    const MAX_RESULTS = 20;

    const builder = this.businessRepository
      .createQueryBuilder('business')
      .leftJoinAndSelect('business.categories', 'category')
      .where('business.status = :status', { status: BusinessStatus.APPROVED });

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
        'business.contactPhone',
        'business.salesType',
      ])
      .where('business.status = :status', { status: BusinessStatus.APPROVED })
      .getMany();
  }
}