//h1
import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { BusinessStatus } from '../../business/entities/business.entity';

export class UpdateBusinessStatusDto {
  @IsEnum(BusinessStatus)
  status: BusinessStatus;

  @IsOptional()
  @IsString()
  @MinLength(10, { message: 'El motivo de rechazo debe contener una descripción clara (mínimo 10 caracteres).' })
  rejectionReason?: string;
}