// src/modules/business/dto/create-business.dto.ts
import { IsString, IsNumber, IsEnum, IsObject, IsArray, IsUUID, MaxLength, MinLength } from 'class-validator';
import { SalesType } from '../entitites/business.entity';

export class CreateBusinessDto {
  @IsString()
  @MinLength(3)
  @MaxLength(150)
  name: string;

  @IsString()
  @MinLength(10)
  description: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsEnum(SalesType)
  salesType: SalesType;

  @IsString()
  @MaxLength(20)
  contactPhone: string;

  @IsObject()
  operatingHours: Record<string, any>;

  @IsArray()
  @IsUUID('all', { each: true })
  categoryIds: string[];
}
