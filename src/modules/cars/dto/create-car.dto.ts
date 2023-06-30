import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
const current = new Date().getFullYear();

export class CreateCarDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value.toLowerCase())
  brand: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value.toLowerCase())
  model: string;

  @ApiProperty()
  @IsInt()
  @Max(current, {
    message: `Must not be greater than current year: ${current}`,
  })
  @Min(1886, { message: 'No cars existed before 1886' })
  @IsNotEmpty()
  year: number;

  @ApiProperty()
  @IsIn(['electric', 'flex', 'hybrid'])
  @IsNotEmpty()
  fuel: 'electric' | 'flex' | 'hybrid';

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  mileage: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value.toLowerCase())
  color: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  cover_image: string;

  @ApiPropertyOptional({
    description: 'The url to a working hosted image',
    type: Array<string>,
  })
  @IsString({ each: true })
  car_gallery: string[];

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  is_active: boolean;
}

export class GalleryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  image: string;
}
