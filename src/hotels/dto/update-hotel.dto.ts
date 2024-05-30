import { IsOptional, IsString } from 'class-validator';

export class UpdateHotelDto {
  @IsString()
  @IsOptional()
  readonly name?: string;
}
