import { PartialType } from '@nestjs/swagger';
import { CreateCarDto, GalleryDto } from './create-car.dto';

export class UpdateCarDto extends PartialType(CreateCarDto) {}

export class UpdateGalleryDto extends PartialType(GalleryDto) {}
