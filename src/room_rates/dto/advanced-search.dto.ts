import { IsDateString, IsDecimal, IsOptional, IsString } from 'class-validator';

export class AdvancedSearchDto {
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDecimal()
  default_rate?: number;

  @IsOptional()
  @IsDecimal()
  weekend_rate?: number;

  @IsOptional()
  @IsDateString()
  start_date?: Date;

  @IsOptional()
  @IsDateString()
  end_date?: Date;
}
