import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { PrismaService } from 'src/database/prisma.service';
import { AddressRepository } from './repositories/addresses.repository';
import { AddressPrismaRepository } from './repositories/prisma/address.prisma.repository';

@Module({
  controllers: [AddressesController],
  providers: [
    AddressesService,
    PrismaService,
    AddressPrismaRepository,
    { provide: AddressRepository, useClass: AddressPrismaRepository },
  ],
  exports: [AddressesService],
})
export class AddressesModule {}
