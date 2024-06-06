import { IsOptional, IsString, IsEnum } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  page: number = 1;

  @IsOptional()
  limit: number = 10;

  @IsOptional()
  @IsString()
  sortField?: string;

  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC';
}
