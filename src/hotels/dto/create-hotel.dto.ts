import { IsString } from 'class-validator';

export class CreateHotelDto {
  @IsString()
  readonly name: string;
}
