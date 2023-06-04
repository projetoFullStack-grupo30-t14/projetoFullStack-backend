import { Injectable } from '@nestjs/common';
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

    const { car_gallery, ...rest } = data;

    const car: Cars = new Car();
    Object.assign(car, { ...rest });

    const { brand, model, year } = data;
    const galleryId: {
      image: string;
    }[] = car_gallery.map((image) => {
      return { image: image };
    });

    let findValue = 0;
    const url = `https://kenzie-kars.herokuapp.com/cars/unique?brand=${brand}&name=${model}&year=${year}&fuel=${fuelToApi}`;
    await fetch(url)
      .then((response) => response.json())
      .then((res) => {
        findValue = res.value;
      })
      .catch((err) => console.log(err));

    const createdCar: Cars = await this.prisma.cars.create({
      data: {
        ...car,
        price_FIPE: findValue,
        car_gallery: { createMany: { data: galleryId } },
      },
      include: {
        car_gallery: {
          select: {
            image: true,
          },
        },
      },
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
        year: { lte: year ? +year : year },
        fuel: fuel,
        mileage: { lte: mileage ? +mileage : mileage },
        price: { lte: price ? +price : price },
      },
      include: {
        car_gallery: {
          select: {
            image: true,
          },
        },
      },
    });

    return plainToInstance(Car, carList);
  }

  async findOne(id: string): Promise<Car> {
    const findCar: Cars | null = await this.prisma.cars.findUnique({
      where: { id },
      include: {
        car_gallery: {
          select: {
            image: true,
          },
        },
      },
    });

    return plainToInstance(Car, findCar);
  }

  async update(id: string, data: UpdateCarDto): Promise<Car> {
    const { car_gallery, ...rest } = data;

    const updatedCar: Cars = await this.prisma.cars.update({
      where: { id },
      data: {
        ...rest,
      },
      include: {
        car_gallery: {
          select: {
            image: true,
            id: true,
          },
        },
      },
    });

    return plainToInstance(Car, updatedCar);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.cars.delete({ where: { id } });
  }
}
