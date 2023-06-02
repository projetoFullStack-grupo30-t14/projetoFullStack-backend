import { Transform } from 'class-transformer';
import { IsIn, IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

const current = new Date().getFullYear();

export class CreateCarDto {
  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsInt()
  @IsNotEmpty()
  @Max(current)
  @Min(1886)
  @Transform(({ value }: { value: string }) => new Date(`${value}-02-01`), {
    groups: ['transform'],
  })
  year: Date;

  @IsIn(['electric', 'flex', 'hybrid'])
  @IsNotEmpty()
  fuel: 'electric' | 'flex' | 'hybrid';

  @IsInt()
  @IsNotEmpty()
  mileage: number;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsInt()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  cover_image: string;
}
