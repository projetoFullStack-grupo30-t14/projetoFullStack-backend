import { Module } from '@nestjs/common';
import { CarsModule } from './modules/cars/cars.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [CarsModule, UsersModule],
})
export class AppModule {}
