import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Business } from '../business/entities/business.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Business)
    private readonly businessRepository: Repository<Business>,
  ) {}

  async updateBusinessStatus(businessId: string, status: string, rejectionReason?: string) {
    const validStatuses = ['PENDING', 'APPROVED', 'REJECTED'];
    if (!validStatuses.includes(status)) {
      throw new BadRequestException('Estado inválido');
    }

    if (status === 'REJECTED' && !rejectionReason) {
      throw new BadRequestException('Debe proveer una razón (rejectionReason) si rechaza el negocio');
    }

    const business = await this.businessRepository.findOne({ where: { id: businessId } });
    if (!business) {
      throw new NotFoundException('Negocio no encontrado');
    }

    business.status = status;
    business.rejectionReason = status === 'REJECTED' ? (rejectionReason ?? null) : null;

    return this.businessRepository.save(business);
  }
}
