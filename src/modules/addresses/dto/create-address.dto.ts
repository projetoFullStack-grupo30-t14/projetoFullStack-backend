import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsInt()
  @IsNotEmpty()
  cep: number;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  street: string;

  @IsInt()
  @IsNotEmpty()
  number: number;

  @IsString()
  complement: string;
}
