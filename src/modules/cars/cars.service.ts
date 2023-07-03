import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto, UpdateGalleryDto } from './dto/update-car.dto';
import { CarPrismaRepository } from './repositories/prisma/car.prisma.repository';
import { IRequestUser } from './cars.controller';

@Injectable()
export class CarsService {
  constructor(private carRepository: CarPrismaRepository) {}
  create(createCarDto: CreateCarDto, user: IRequestUser) {
    return this.carRepository.create(createCarDto, user);
  }

  findAll(
    brand: string | undefined,
    model: string | undefined,
    color: string | undefined,
    year: number | undefined,
    fuel: 'electric' | 'flex' | 'hybrid' | undefined,
    mileageMin: number | undefined,
    mileageMax: number | undefined,
    priceMin: number | undefined,
    priceMax: number | undefined,
    mileageBy: 'asc' | 'desc' | undefined,
    priceBy: 'asc' | 'desc' | undefined,
    page: number | undefined,
    perPage: number | undefined,
    user_id: string | undefined,
  ) {
    return this.carRepository.findAll(
      brand,
      model,
      color,
      year,
      fuel,
      mileageMin,
      mileageMax,
      priceMin,
      priceMax,
      mileageBy,
      priceBy,
      page,
      perPage,
      user_id,
    );
  }

  findOne(id: string) {
    const car = this.carRepository.findOne(id);
    if (!car) {
      throw new NotFoundException('Car not found');
    }
    return car;
  }

  update(id: string, updateCarDto: UpdateCarDto, user: IRequestUser) {
    const car = this.carRepository.update(id, updateCarDto, user);
    if (!car) {
      throw new NotFoundException('Car not found');
    }
    return car;
  }

  updateGallery(id: string, UpdateGalleryDto: UpdateGalleryDto) {
    return this.carRepository.updateGallery(id, UpdateGalleryDto);
  }

  remove(id: string) {
    const car = this.carRepository.delete(id);
    if (!car) {
      throw new NotFoundException('Car not found');
    }
    return car;
  }

  findValues() {
    return this.carRepository.distinctValues();
  }

  findByOwner(
    user_id: string,
    page: number | undefined,
    perPage: number | undefined,
  ) {
    return this.carRepository.findByOwner(user_id, page, perPage);
  }
}
