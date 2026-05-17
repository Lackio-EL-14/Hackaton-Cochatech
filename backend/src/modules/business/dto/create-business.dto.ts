import { IsNotEmpty, IsString, IsNumber, IsEnum, IsObject, MaxLength } from 'class-validator';

export class CreateBusinessDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre del negocio es requerido' })
  @MaxLength(150)
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'La descripción es requerida' })
  description: string;

  @IsNumber()
  @IsNotEmpty({ message: 'La latitud es requerida' })
  latitude: number;

  @IsNumber()
  @IsNotEmpty({ message: 'La longitud es requerida' })
  longitude: number;

  @IsEnum(['VIRTUAL', 'PRESENCIAL', 'AMBOS'], { message: 'Tipo de venta inválido' })
  @IsNotEmpty()
  salesType: string;

  @IsString()
  @IsNotEmpty({ message: 'El teléfono de contacto es requerido' })
  @MaxLength(20)
  contactPhone: string;

  @IsObject({ message: 'Los horarios de atención deben ser un esquema JSON estructurado' })
  @IsNotEmpty()
  operatingHours: Record<string, any>;
}
