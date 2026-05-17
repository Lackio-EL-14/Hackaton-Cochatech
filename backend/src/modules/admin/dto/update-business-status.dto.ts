//h1
import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { BusinessStatus } from '../../business/entitites/business.entity';

export class UpdateBusinessStatusDto {
  @IsEnum(BusinessStatus)
  status: BusinessStatus= BusinessStatus.PENDING;

  @IsOptional()
  @IsString()
  @MinLength(10, { message: 'El motivo de rechazo debe contener una descripción clara (mínimo 10 caracteres).' })
  rejectionReason?: string;
}