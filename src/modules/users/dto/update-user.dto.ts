import { hashSync } from 'bcryptjs';
import { Transform } from 'class-transformer';
import { IsString, IsEmail, MinLength, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  cpf: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsString()
  @IsOptional()
  date_of_birth: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  @MinLength(8)
  @Transform(({ value }: { value: string }) => hashSync(value), {
    groups: ['transform'],
  })
  password: string;
}
