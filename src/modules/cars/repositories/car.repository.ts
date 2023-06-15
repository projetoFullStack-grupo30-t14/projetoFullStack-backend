import { User } from 'src/modules/users/entities/user.entity';
import { CreateCarDto } from '../dto/create-car.dto';
import { UpdateCarDto, UpdateGalleryDto } from '../dto/update-car.dto';
import { Car, Car_image } from '../entities/car.entity';
import { IRequestUser } from '../cars.controller';

export abstract class CarRepository {
  abstract create(data: CreateCarDto, user: User): Promise<Car> | Car;
  abstract findAll(
    brand: string | undefined,
    model: string | undefined,
    color: string | undefined,
    year: number | undefined,
    fuel: 'electric' | 'flex' | 'hybrid' | undefined,
    mileageMin: number | undefined,
    mileageMax: number | undefined,
    priceMin: number | undefined,
    priceMax: number | undefined,
    mileageBy: 'asc' | 'desc',
    priceBy: 'asc' | 'desc',
    page: number | undefined,
    perPage: number | undefined,
  ): Promise<Car[]> | Car[];
  abstract findOne(id: string): Promise<Car> | Car;
  abstract update(
    id: string,
    data: UpdateCarDto,
    user: IRequestUser,
  ): Promise<Car> | Car;
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
  abstract findByOwner(user_id: string): Promise<Car[]> | Car[];
}
