import { PartialType } from '@nestjs/mapped-types';
import { CreateCarDto, GalleryDto } from './create-car.dto';

export class UpdateCarDto extends PartialType(CreateCarDto) {}

export class UpdateGalleryDto extends PartialType(GalleryDto) {}
