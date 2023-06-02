import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { CarPrismaRepository } from './repositories/prisma/car.prisma.repository';

@Injectable()
export class CarsService {
  constructor(private carRepository: CarPrismaRepository) {}
  create(createCarDto: CreateCarDto) {
    return this.carRepository.create(createCarDto);
  }

  findAll(
    brand: string | undefined,
    model: string | undefined,
    color: string | undefined,
    year: Date | undefined,
    fuel: 'electric' | 'flex' | 'hybrid' | undefined,
    mileage: number | undefined,
    price: number | undefined,
  ) {
    return this.carRepository.findAll(
      brand,
      model,
      color,
      year,
      fuel,
      mileage,
      price,
    );
  }

  findOne(id: string) {
    return this.carRepository.findOne(id);
  }

  update(id: string, updateCarDto: UpdateCarDto) {
    return this.carRepository.update(id, updateCarDto);
  }

  remove(id: string) {
    return this.carRepository.delete(id);
  }
}
