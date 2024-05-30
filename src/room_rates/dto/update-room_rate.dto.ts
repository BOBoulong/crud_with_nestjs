import { IsString, IsOptional, IsDecimal, IsDate } from 'class-validator';

export class UpdateRoomRateDto {
  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsDecimal()
  @IsOptional()
  readonly default_rate?: number;

  @IsDecimal()
  @IsOptional()
  readonly weekend_rate?: number;

  @IsDate()
  @IsOptional()
  readonly start_date?: Date;

  @IsDate()
  @IsOptional()
  readonly end_date?: Date;

  @IsOptional()
  readonly room_type_id?: number;
}
