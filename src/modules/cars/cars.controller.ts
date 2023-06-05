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
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto, UpdateGalleryDto } from './dto/update-car.dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() createCarDto: CreateCarDto) {
    return this.carsService.create(createCarDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll(
    @Query('brand') brand: string | undefined,
    @Query('model') model: string | undefined,
    @Query('color') color: string | undefined,
    @Query('year') year: number | undefined,
    @Query('fuel') fuel: 'electric' | 'flex' | 'hybrid' | undefined,
    @Query('mileage') mileage: number | undefined,
    @Query('price') price: number | undefined,
    @Query('mileageBy') mileageBy: 'asc' | 'desc',
    @Query('priceBy') priceBy: 'asc' | 'desc',
  ) {
    return this.carsService.findAll(
      brand,
      model,
      color,
      year,
      fuel,
      mileage,
      price,
      mileageBy,
      priceBy,
    );
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carsService.findOne(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/get/values')
  findValues() {
    return this.carsService.findValues();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carsService.update(id, updateCarDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch('/gallery/:id')
  updateGallery(
    @Param('id') id: string,
    @Body() updateGalleryDto: UpdateGalleryDto,
  ) {
    return this.carsService.updateGallery(id, updateGalleryDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carsService.remove(id);
  }
}
