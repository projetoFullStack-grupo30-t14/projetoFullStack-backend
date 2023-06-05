import { CreateCarDto } from '../dto/create-car.dto';
import { UpdateCarDto, UpdateGalleryDto } from '../dto/update-car.dto';
import { Car, Car_image } from '../entities/car.entity';

export abstract class CarRepository {
  abstract create(data: CreateCarDto): Promise<Car> | Car;
  abstract findAll(
    brand: string | undefined,
    model: string | undefined,
    color: string | undefined,
    year: number | undefined,
    fuel: 'electric' | 'flex' | 'hybrid' | undefined,
    mileage: number | undefined,
    price: number | undefined,
    mileageBy: 'asc' | 'desc',
    priceBy: 'asc' | 'desc',
  ): Promise<Car[]> | Car[];
  abstract findOne(id: string): Promise<Car> | Car;
  abstract update(id: string, data: UpdateCarDto): Promise<Car> | Car;
  abstract updateGallery(
    id: string,
    data: UpdateGalleryDto,
  ): Promise<Car_image> | Car_image;
  abstract delete(id: string): Promise<void> | void;
  abstract distinctValues(): Promise<{
    year: number[];
    color: string[];
    brand: string[];
    model: string[];
  }>;
}
