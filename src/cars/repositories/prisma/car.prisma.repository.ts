import { HttpException, Injectable } from '@nestjs/common';
import { CarRepository } from '../car.repository';
import { CreateCarDto } from 'src/cars/dto/create-car.dto';
import { Car } from 'src/cars/entities/car.entity';
import { PrismaService } from 'src/database/prisma.service';
import { plainToInstance } from 'class-transformer';
import { UpdateCarDto } from 'src/cars/dto/update-car.dto';
import { Cars } from '@prisma/client';

@Injectable()
export class CarPrismaRepository implements CarRepository {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateCarDto): Promise<Car> {
    let fuelToApi: number;

    switch (data.fuel) {
      case 'flex':
        fuelToApi = 1;
        break;
      case 'hybrid':
        fuelToApi = 2;
        break;
      case 'electric':
        fuelToApi = 3;
        break;
    }

    const car: Cars = new Car();
    Object.assign(car, { ...data });

    const { brand, model, year } = data;

    let findValue = 0;
    const url = `https://kenzie-kars.herokuapp.com/cars/unique?brand=${brand}&name=${model}&year=${year}&fuel=${fuelToApi}`;
    await fetch(url)
      .then((response) => response.json())
      .then((res) => {
        findValue = res.value;
      })
      .catch((err) => console.log(err));

    const createdCar: Cars = await this.prisma.cars.create({
      data: { ...car, price_FIPE: findValue },
    });

    return plainToInstance(Car, createdCar);
  }

  async findAll(
    brand: string | undefined,
    model: string | undefined,
    color: string | undefined,
    year: number | undefined,
    fuel: 'electric' | 'flex' | 'hybrid' | undefined,
    mileage: number | undefined,
    price: number | undefined,
  ): Promise<Car[]> {
    const carList: Cars[] = await this.prisma.cars.findMany({
      where: {
        brand: { contains: brand, mode: 'insensitive' },
        model: { contains: model, mode: 'insensitive' },
        color: { contains: color, mode: 'insensitive' },
        year: { lte: year },
        fuel: fuel,
        mileage: { lte: mileage ? +mileage : mileage },
        price: { lte: price ? +price : price },
      },
    });

    return plainToInstance(Car, carList);
  }

  async findOne(id: string): Promise<Car> {
    const findCar: Cars | null = await this.prisma.cars.findUnique({
      where: { id },
    });

    if (!findCar) {
      throw new HttpException('Car not found', 404);
    }

    return plainToInstance(Car, findCar);
  }

  async update(id: string, data: UpdateCarDto): Promise<Car> {
    const findCar: Cars | null = await this.prisma.cars.findUnique({
      where: { id },
    });

    if (!findCar) {
      throw new HttpException('Car not found', 404);
    }

    const updatedCar: Cars = await this.prisma.cars.update({
      where: { id },
      data: {
        ...data,
      },
    });

    return plainToInstance(Car, updatedCar);
  }

  async delete(id: string): Promise<void> {
    const findCar: Cars | null = await this.prisma.cars.findUnique({
      where: { id },
    });

    if (!findCar) {
      throw new HttpException('Car not found', 404);
    }

    await this.prisma.cars.delete({ where: { id } });
  }
}
