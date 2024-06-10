import { PartialType } from '@nestjs/mapped-types';
import { CreateHotelDetailDto } from './create-hotel_detail.dto';

export class UpdateHotelDetailDto extends PartialType(CreateHotelDetailDto) {}
