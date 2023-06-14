import { Module } from '@nestjs/common';
import { CarsModule } from './modules/cars/cars.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AddressesModule } from './modules/addresses/addresses.module';

@Module({
  imports: [CarsModule, UsersModule, AuthModule, AddressesModule],
})
export class AppModule {}
