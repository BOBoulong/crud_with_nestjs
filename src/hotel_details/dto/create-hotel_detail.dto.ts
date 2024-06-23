import {
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsNotEmpty,
  IsInt,
} from 'class-validator';

export class CreateHotelDetailDto {
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly address: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsPhoneNumber(null)
  @IsNotEmpty()
  readonly phone: string;

  @IsInt()
  @IsNotEmpty()
  readonly hotel_id: number;
}
