import { IsString, IsBoolean, IsOptional } from 'class-validator';
export class CreateAmenityDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly group: string;

  @IsBoolean()
  readonly has_extra_charge: boolean;

  @IsString()
  @IsOptional()
  readonly description?: string;
}
