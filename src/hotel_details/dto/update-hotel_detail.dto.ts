import { PartialType } from '@nestjs/mapped-types';
import { CreateHotelDetailDto } from './create-hotel_detail.dto';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class UpdateHotelDetailDto extends PartialType(CreateHotelDetailDto) {
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
