import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateAmenityDto {
  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsString()
  @IsOptional()
  readonly group?: string;

  @IsBoolean()
  @IsOptional()
  readonly has_extra_charge?: boolean;

  @IsString()
  @IsOptional()
  readonly description?: string;
}
