// t1
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Business, BusinessStatus } from '../business/entities/business.entity';
import { UpdateBusinessStatusDto } from './dto/update-business-status.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Business)
    private readonly businessRepository: Repository<Business>,
  ) {}

  async getPendingBusinesses(): Promise<Business[]> {
    return this.businessRepository.find({
      where: { status: BusinessStatus.PENDING },
      order: { createdAt: 'DESC' },
    });
  }

  async updateStatus(id: string, dto: UpdateBusinessStatusDto): Promise<Business> {
    const business = await this.businessRepository.findOne({ where: { id } });
    if (!business) {
      throw new NotFoundException(`No se encontró ningún emprendimiento con el ID: ${id}`);
    }

    if (dto.status === BusinessStatus.REJECTED && !dto.rejectionReason) {
      throw new BadRequestException('Es obligatorio especificar un motivo de rechazo.');
    }

    business.status = dto.status;
    business.rejectionReason = dto.status === BusinessStatus.REJECTED ? dto.rejectionReason : null;

    return this.businessRepository.save(business);
  }
}