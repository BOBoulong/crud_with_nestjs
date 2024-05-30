import {
  IsString,
  IsInt,
  IsOptional,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';

export class UpdateRoomTypeDto {
  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsInt()
  @IsOptional()
  readonly capacity_adult?: number;

  @IsInt()
  @IsOptional()
  readonly capacity_children?: number;

  @IsInt()
  @IsOptional()
  readonly hotel_id?: number;

  // @IsArray()
  // @ArrayNotEmpty()
  // readonly amenities: number[];
}
