import { Module } from '@nestjs/common';
import { CarsModule } from './modules/cars/cars.module';

@Module({
  imports: [CarsModule],
})
export class AppModule {}
