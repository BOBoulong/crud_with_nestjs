import { IsOptional, IsString } from 'class-validator';

export class AdvancedSearchDto {
  @IsOptional()
  @IsString()
  name?: string;
}
