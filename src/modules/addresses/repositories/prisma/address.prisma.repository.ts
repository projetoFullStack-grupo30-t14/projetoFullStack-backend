import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/database/prisma.service';
import { CreateAddressDto } from '../../dto/create-address.dto';
import { UpdateAddressDto } from '../../dto/update-address.dto';
import { Address } from '../../entities/address.entity';
import { AddressRepository } from '../addresses.repository';

@Injectable()
export class AddressPrismaRepository implements AddressRepository {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateAddressDto, user_id: string): Promise<Address> {
    const address = new Address();
    Object.assign(address, {
      ...data,
    });

    const newAddress = this.prisma.addresses.create({
      data: {
        cep: address.cep,
        state: address.state,
        city: address.city,
        street: address.street,
        number: address.number,
        complement: address.complement,
        user_id: user_id,
      },
    });
    return plainToInstance(Address, newAddress);
  }

  async findAll(): Promise<Address[]> {
    const addresses: Address[] = await this.prisma.addresses.findMany();
    return plainToInstance(Address, addresses);
  }

  async findOne(id: string): Promise<Address> {
    const address = await this.prisma.addresses.findUnique({
      where: { id },
    });
    return plainToInstance(Address, address);
  }

  async update(id: string, data: UpdateAddressDto): Promise<Address> {
    const address = await this.prisma.addresses.update({
      where: { id },
      data: { ...data },
    });
    return plainToInstance(Address, address);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.addresses.delete({
      where: { id },
    });
  }
}
