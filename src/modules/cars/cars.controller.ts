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
import { JWTAuthGuard } from '../auth/jwt.auth.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

export interface IRequestUser {
  id: string;
  email: string;
}

@ApiTags('cars')
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
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
    @Query('user_id') user_id: string | undefined,
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
      user_id,
    );
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carsService.findOne(id);
  }

  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JWTAuthGuard)
  @Get('/access/owner')
  findByOwner(@CurrentUser() user: IRequestUser) {
    return this.carsService.findByOwner(user.id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/access/values')
  findValues() {
    return this.carsService.findValues();
  }

  @ApiBearerAuth()
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

  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch('/gallery/:id')
  @UseGuards(JWTAuthGuard)
  updateGallery(
    @Param('id') id: string,
    @Body() updateGalleryDto: UpdateGalleryDto,
  ) {
    return this.carsService.updateGallery(id, updateGalleryDto);
  }

  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(204)
  @Delete(':id')
  @UseGuards(JWTAuthGuard)
  remove(@Param('id') id: string) {
    return this.carsService.remove(id);
  }
}
