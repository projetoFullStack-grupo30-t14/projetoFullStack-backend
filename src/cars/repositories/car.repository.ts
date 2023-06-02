import { CreateCarDto } from '../dto/create-car.dto';
import { UpdateCarDto } from '../dto/update-car.dto';
import { Car } from '../entities/car.entity';

export abstract class CarRepository {
  abstract create(data: CreateCarDto): Promise<Car> | Car;
  abstract findAll(
    brand: string | undefined,
    model: string | undefined,
    color: string | undefined,
    year: Date | undefined,
    fuel: 'electric' | 'flex' | 'hybrid' | undefined,
    mileage: number | undefined,
    price: number | undefined,
  ): Promise<Car[]> | Car[];
  abstract findOne(id: string): Promise<Car> | Car;
  abstract update(id: string, data: UpdateCarDto): Promise<Car> | Car;
  abstract delete(id: string): Promise<void> | void;
}
