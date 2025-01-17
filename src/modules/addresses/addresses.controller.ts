import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { JWTAuthGuard } from '../auth/jwt.auth.guard';
import { CurrentUser } from '../users/user.decorator';
import { IRequestUser } from '../cars/cars.controller';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('addresses')
@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @ApiBearerAuth()
  @Post()
  @UseGuards(JWTAuthGuard)
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressesService.create(createAddressDto);
  }

  @Get()
  findAll() {
    return this.addressesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addressesService.findOne(id);
  }

  @ApiBearerAuth()
  @Patch()
  @UseGuards(JWTAuthGuard)
  update(
    @Body() updateAddressDto: UpdateAddressDto,
    @CurrentUser() user: IRequestUser,
  ) {
    return this.addressesService.update(user.id, updateAddressDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(JWTAuthGuard)
  remove(@Param('id') id: string) {
    return this.addressesService.remove(id);
  }
}
