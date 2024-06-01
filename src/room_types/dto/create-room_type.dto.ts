import {
  IsString,
  IsInt,
  IsOptional,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateRoomTypeDto {
  @IsString()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsInt()
  readonly capacity_adult: number;

  @IsInt()
  @IsOptional()
  readonly capacity_children?: number;

  @IsInt()
  readonly hotel_id: number;

  @IsArray()
  @ArrayNotEmpty()
  readonly amenities: number[];
}
