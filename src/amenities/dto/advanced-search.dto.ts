import { IsOptional, IsString } from 'class-validator';

export class AdvancedSearchDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  group?: string;

  @IsOptional()
  has_extra_charge?: boolean;

  @IsOptional()
  @IsString()
  description?: string;
}
