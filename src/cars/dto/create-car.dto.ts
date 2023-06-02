import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateCarDto {
  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsDate()
  @IsNotEmpty()
  year: Date;

  @IsIn(['electric', 'gas', 'hybrid'])
  @IsNotEmpty()
  fuel: 'electric' | 'gas' | 'hybrid';

  @IsInt()
  @IsNotEmpty()
  mileage: number;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsInt()
  @IsNotEmpty()
  price_FIPE: number;

  @IsInt()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  cover_image: string;

  @IsBoolean()
  @Transform(({ value }: { value: boolean }) => true, {
    groups: ['transform'],
  })
  is_active: boolean;

  @IsDate()
  @Transform(({ value }: { value: string }) => Date.now(), {
    groups: ['transform'],
  })
  created_at: Date;
}
