import { IsString, IsOptional, IsDecimal } from 'class-validator';

export class CreateRoomRateDto {
  @IsString()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsDecimal()
  readonly default_rate: number;

  @IsDecimal()
  @IsOptional()
  readonly weekend_rate?: number;

  @IsOptional()
  readonly start_date?: Date;

  @IsOptional()
  readonly end_date?: Date;

  readonly room_type_id: number;
}
