import { HttpException, Injectable } from '@nestjs/common';
import { CarRepository } from '../car.repository';
import { CreateCarDto } from 'src/cars/dto/create-car.dto';
import { Car } from 'src/cars/entities/car.entity';
import { PrismaService } from 'src/database/prisma.service';
import { plainToInstance } from 'class-transformer';
import { UpdateCarDto } from 'src/cars/dto/update-car.dto';

@Injectable()
export class CarPrismaRepository implements CarRepository {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateCarDto): Promise<Car> {
    const car: Car = new Car();
    Object.assign(car, { ...data });

    const createdCar: Car = await this.prisma.cars.create({ data: { ...car } });

    return plainToInstance(Car, createdCar);
  }

  async findAll(
    brand: string | undefined,
    model: string | undefined,
    color: string | undefined,
    year: Date | undefined,
    fuel: 'electric' | 'gas' | 'hybrid' | undefined,
    mileage: number | undefined,
    price: number | undefined,
  ): Promise<Car[]> {
    const carList: Car[] = await this.prisma.cars.findMany({
      where: {
        OR: [
          {
            brand: { contains: brand, mode: 'insensitive' },
          },
          {
            model: { contains: model, mode: 'insensitive' },
          },
          {
            color: { contains: color, mode: 'insensitive' },
          },
          {
            year: { lte: year },
          },
          {
            fuel: fuel,
          },
          {
            mileage: { lte: mileage },
          },
          {
            price: { lte: price },
          },
        ],
      },
    });

    return plainToInstance(Car, carList);
  }

  async findOne(id: string): Promise<Car> {
    const findCar: Car | null = await this.prisma.cars.findUnique({
      where: { id },
    });

    if (!findCar) {
      throw new HttpException('Car not found', 404);
    }

    return plainToInstance(Car, findCar);
  }

  async update(id: string, data: UpdateCarDto): Promise<Car> {
    const findCar: Car | null = await this.prisma.cars.findUnique({
      where: { id },
    });

    if (!findCar) {
      throw new HttpException('Car not found', 404);
    }

    const updatedCar: Car = await this.prisma.cars.update({
      where: { id },
      data: {
        ...data,
      },
    });

    return plainToInstance(Car, updatedCar);
  }

  async delete(id: string): Promise<void> {
    const findCar: Car | null = await this.prisma.cars.findUnique({
      where: { id },
    });

    if (!findCar) {
      throw new HttpException('Car not found', 404);
    }

    await this.prisma.cars.delete({ where: { id } });
  }
}
