import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { PrismaService } from 'src/database/prisma.service';
import { CarPrismaRepository } from './repositories/prisma/car.prisma.repository';
import { CarRepository } from './repositories/car.repository';

@Module({
  controllers: [CarsController],
  providers: [
    CarsService,
    PrismaService,
    CarPrismaRepository,
    { provide: CarRepository, useClass: CarPrismaRepository },
  ],
})
export class CarsModule {}
