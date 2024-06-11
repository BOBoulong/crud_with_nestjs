import { IsOptional, IsString } from 'class-validator';

export class CreateHotelDto {
  @IsString()
  @IsOptional()
  readonly name: string;
}
