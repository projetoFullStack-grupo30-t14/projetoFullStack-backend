import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { CarRepository, FindAllReturn } from '../car.repository';
import { PrismaService } from 'src/database/prisma.service';
import { plainToInstance } from 'class-transformer';
import { Cars } from '@prisma/client';
import { CreateCarDto } from '../../dto/create-car.dto';
import { UpdateCarDto, UpdateGalleryDto } from '../../dto/update-car.dto';
import { Car, Car_image } from '../../entities/car.entity';
import { IRequestUser } from '../../cars.controller';

@Injectable()
export class CarPrismaRepository implements CarRepository {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateCarDto, user: IRequestUser): Promise<Car> {
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
        usersId: user.id,
        price_FIPE: findValue,
        car_gallery: { createMany: { data: galleryId } },
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

    return plainToInstance(Car, createdCar);
  }

  async findAll(
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
    page: number | undefined = 1,
    perPage: number | undefined = 12,
    user_id: string | undefined,
  ): Promise<FindAllReturn> {
    if (perPage === 0) {
      perPage = 1;
    }

    if (isNaN(Number(perPage))) {
      perPage = 12;
    }

    if (isNaN(Number(page))) {
      page = 1;
    }

    if (page <= 0) {
      page = 1;
    }

    const query: Prisma.CarsFindManyArgs = {
      where: {
        brand: { contains: brand, mode: 'insensitive' },
        model: { contains: model, mode: 'insensitive' },
        color: { contains: color, mode: 'insensitive' },
        year: { lte: year ? +year : year },
        fuel: fuel,
        mileage: {
          lte: mileageMax ? +mileageMax : mileageMax,
          gte: mileageMin ? +mileageMin : mileageMin,
        },
        price: {
          lte: priceMax ? +priceMax : priceMax,
          gte: priceMin ? +priceMin : priceMin,
        },
        usersId: user_id,
      },
      include: {
        car_gallery: {
          select: {
            image: true,
            id: true,
          },
        },
      },
      orderBy: {
        mileage: mileageBy,
        price: priceBy,
      },
      take: +perPage,
      skip: (+page - 1) * +perPage,
    };

    const [carList, count]: [Cars[], number] = await this.prisma.$transaction([
      this.prisma.cars.findMany(query),
      this.prisma.cars.count({ where: query.where }),
    ]);

    let url = `http://localhost:3001/cars?`;

    if (brand) {
      url = url.concat(`brand=${brand}&`);
    }
    if (model) {
      url = url.concat(`model=${model}&`);
    }
    if (color) {
      url = url.concat(`color=${color}&`);
    }
    if (year) {
      url = url.concat(`year=${year}&`);
    }
    if (fuel) {
      url = url.concat(`fuel=${fuel}&`);
    }
    if (mileageMin) {
      url = url.concat(`mileageMin=${mileageMin}&`);
    }
    if (mileageMax) {
      url = url.concat(`mileageMax=${mileageMax}&`);
    }
    if (priceMin) {
      url = url.concat(`priceMin=${priceMin}&`);
    }
    if (priceMax) {
      url = url.concat(`priceMax=${priceMax}&`);
    }
    if (mileageBy) {
      url = url.concat(`mileageBy=${mileageBy}&`);
    }
    if (priceBy) {
      url = url.concat(`priceBy=${priceBy}&`);
    }
    if (user_id) {
      url = url.concat(`user_id=${user_id}&`);
    }

    const returnObj = {
      count: count,
      previousPage:
        perPage * (page - 1) === 0
          ? null
          : `${url}page=${Number(page) - 1}&perPage=${perPage}`,
      nextPage:
        count <= Number(perPage * page)
          ? null
          : `${url}page=${Number(page) + 1}&perPage=${perPage}`,
      data: plainToInstance(Car, carList),
    };

    return returnObj;
  }

  async findOne(id: string): Promise<Car> {
    const findCar: Cars | null = await this.prisma.cars.findUnique({
      where: { id },
      include: {
        car_gallery: {
          select: {
            image: true,
            id: true,
          },
        },
      },
    });

    return plainToInstance(Car, findCar);
  }

  async update(
    id: string,
    data: UpdateCarDto,
    user: IRequestUser,
  ): Promise<Car> {
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

  async updateGallery(id: string, data: UpdateGalleryDto): Promise<Car_image> {
    const updatedGallery: Car_image = await this.prisma.carGallery.update({
      where: { id },
      data: { ...data },
    });

    return plainToInstance(Car_image, updatedGallery);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.cars.delete({ where: { id } });
  }

  async distinctValues(): Promise<{
    year: number[];
    color: string[];
    brand: string[];
    model: string[];
  }> {
    const values = {
      year: [0],
      color: [''],
      brand: [''],
      model: [''],
    };

    const year = await this.prisma.cars.groupBy({
      by: ['year'],
    });

    const color = await this.prisma.cars.groupBy({
      by: ['color'],
    });

    const brand = await this.prisma.cars.groupBy({
      by: ['brand'],
    });

    const model = await this.prisma.cars.groupBy({
      by: ['model'],
    });

    values.year = year.map((year) => year.year);
    values.color = color.map((color) => color.color);
    values.brand = brand.map((brand) => brand.brand);
    values.model = model.map((model) => model.model);

    return values;
  }

  async findByOwner(user_id: string): Promise<Car[]> {
    const carList = await this.prisma.cars.findMany({
      where: {
        usersId: user_id,
      },
    });

    return plainToInstance(Car, carList);
  }
}
