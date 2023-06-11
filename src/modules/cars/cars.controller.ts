import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  Query,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto, UpdateGalleryDto } from './dto/update-car.dto';
import { CurrentUser } from '../users/user.decorator';
import { User } from '../users/entities/user.entity';
import { JWTAuthGuard } from '../auth/jwt.auth.guard';

export interface IRequestUser {
  id: string;
  email: string;
}

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @UseGuards(JWTAuthGuard)
  create(
    @Body() createCarDto: CreateCarDto,
    @CurrentUser() user: IRequestUser,
  ) {
    return this.carsService.create(createCarDto, user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll(
    @Query('brand') brand: string | undefined,
    @Query('model') model: string | undefined,
    @Query('color') color: string | undefined,
    @Query('year') year: number | undefined,
    @Query('fuel') fuel: 'electric' | 'flex' | 'hybrid' | undefined,
    @Query('mileageMin') mileageMin: number | undefined,
    @Query('mileageMax') mileageMax: number | undefined,
    @Query('priceMin') priceMin: number | undefined,
    @Query('priceMax') priceMax: number | undefined,
    @Query('mileageBy') mileageBy: 'asc' | 'desc',
    @Query('priceBy') priceBy: 'asc' | 'desc',
    @Query('page') page: number | undefined,
    @Query('perPage') perPage: number | undefined,
  ) {
    return this.carsService.findAll(
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
    );
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carsService.findOne(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/access/values')
  findValues() {
    return this.carsService.findValues();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  @UseGuards(JWTAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateCarDto: UpdateCarDto,
    @CurrentUser() user: IRequestUser,
  ) {
    return this.carsService.update(id, updateCarDto, user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch('/gallery/:id')
  @UseGuards(JWTAuthGuard)
  updateGallery(
    @Param('id') id: string,
    @Body() updateGalleryDto: UpdateGalleryDto,
  ) {
    return this.carsService.updateGallery(id, updateGalleryDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(204)
  @Delete(':id')
  @UseGuards(JWTAuthGuard)
  remove(@Param('id') id: string) {
    return this.carsService.remove(id);
  }
}
