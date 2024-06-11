import {
  IsString,
  IsOptional,
  IsNumber,
  IsDate,
  IsInt,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRoomRateDto {
  @IsString()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  readonly default_rate?: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  readonly weekend_rate?: number;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  readonly start_date?: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  readonly end_date?: Date;

  @IsInt()
  @IsNotEmpty()
  readonly room_type_id: number;
}
