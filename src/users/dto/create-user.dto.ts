import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
