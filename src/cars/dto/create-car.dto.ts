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
  @Max(current, {
    message: `Must not be greater than current year: ${current}`,
  })
  @Min(1886, { message: 'No cars existed before 1886' })
  @IsNotEmpty()
  year: number;

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

  @IsString({ each: true })
  car_gallery: string[];
}

export class GalleryDto {
  @IsString()
  @IsNotEmpty()
  image: string;
}
