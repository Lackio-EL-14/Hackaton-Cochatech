//h2
import { IsOptional, IsString } from 'class-validator';

export class SearchBusinessDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  category?: string;
}