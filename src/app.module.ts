import { Module } from '@nestjs/common';
import { CarsModule } from './modules/cars/cars.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AddressesModule } from './modules/addresses/addresses.module';
import { CommentsModule } from './modules/comments/comments.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    CarsModule,
    UsersModule,
    AuthModule,
    AddressesModule,
    CommentsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..'),
    }),
  ],
})
export class AppModule {}
