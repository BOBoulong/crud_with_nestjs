import { IsString, IsInt, IsOptional } from 'class-validator';

export class UpdateRoomDto {
  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsInt()
  @IsOptional()
  readonly floor?: number;

  @IsInt()
  @IsOptional()
  readonly room_type_id?: number;

  @IsInt()
  @IsOptional()
  readonly hotel_id?: number;
}
