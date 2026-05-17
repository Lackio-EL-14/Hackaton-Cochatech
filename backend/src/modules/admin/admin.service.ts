// t1
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Business, BusinessStatus } from '../business/entitites/business.entity';
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
    business.rejectionReason = dto.status === BusinessStatus.REJECTED ? (dto.rejectionReason??null) : null;

    return this.businessRepository.save(business);
  }
}
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
