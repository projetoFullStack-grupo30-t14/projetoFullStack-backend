import { Transform } from 'class-transformer';
import { IsIn, IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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

  @ApiProperty({ type: Number })
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

  @ApiProperty({ type: [String] })
  @IsString({ each: true })
  car_gallery: string[];
}

export class GalleryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  image: string;
}
