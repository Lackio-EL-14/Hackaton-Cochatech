import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Business } from './entities/business.entity';
import { CreateBusinessDto } from './dto/create-business.dto';

@Injectable()
export class BusinessService {
  constructor(
    @InjectRepository(Business)
    private readonly businessRepository: Repository<Business>,
  ) {}

  async create(createBusinessDto: CreateBusinessDto, userId: string) {
    const existingBusiness = await this.businessRepository.findOne({ where: { userId } });
    if (existingBusiness) {
      throw new ConflictException('Este usuario ya tiene un negocio registrado');
    }

    const newBusiness = this.businessRepository.create({
      ...createBusinessDto,
      userId,
      status: 'PENDING',
    });

    return this.businessRepository.save(newBusiness);
  }

  async update(updateBusinessDto: CreateBusinessDto, userId: string) {
    const business = await this.businessRepository.findOne({ where: { userId } });
    if (!business) {
      throw new NotFoundException('No se encontró ningún negocio asociado a este emprendedor');
    }

    const updatedBusiness = this.businessRepository.merge(business, {
      ...updateBusinessDto,
      status: 'PENDING',
      rejectionReason: null,
    });

    return this.businessRepository.save(updatedBusiness);
  }
  
  async findAllPublic() {
    const businesses = await this.businessRepository.find({ 
      where: { status: 'APPROVED' } 
    });

    const daysMap = ['dom', 'lun', 'mar', 'mie', 'jue', 'vie', 'sab'];
    
    const now = new Date();
    const currentDay = daysMap[now.getDay()];
    const currentTime = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');

    return businesses.map(business => {
      let isOpen = false;
      const todaySchedule = business.operatingHours?.[currentDay];
      
      if (todaySchedule && todaySchedule.closed === false) {
        if (currentTime >= todaySchedule.open && currentTime <= todaySchedule.close) {
          isOpen = true;
        }
      }

      return {
        ...business,
        isOpen
      };
    });
  }

  async findProductsByBusiness(businessId: string) {
    return this.businessRepository.manager.query(
      'SELECT * FROM products WHERE business_id = ?',
      [businessId]
    );
  }

  async findAllCategories() {
    return this.businessRepository.manager.query('SELECT * FROM categories');
  }

}
