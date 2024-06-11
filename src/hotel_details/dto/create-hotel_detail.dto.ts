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
  description: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsPhoneNumber(null)
  @IsNotEmpty()
  phone: string;

  @IsInt()
  @IsNotEmpty()
  hotel_id: number;
}
