/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressRepository } from './repositories/addresses.repository';

@Injectable()
export class AddressesService {
  constructor(private addressRepository: AddressRepository) {}
  create(createAddressDto: CreateAddressDto) {
    return 'This action adds a new address';
  }

  findAll() {
    return this.addressRepository.findAll();
  }

  findOne(id: string) {
    const address = this.addressRepository.findOne(id);
    if (!address) {
      throw new NotFoundException('Endereço não encontrado');
    }
    return address;
  }

  async update(user_id: string, updateAddressDto: UpdateAddressDto) {
    const address = await this.addressRepository.findOne(user_id);

    if (!address) {
      throw new NotFoundException('Endereço não encontrado');
    }
    const newAddress = this.addressRepository.update(
      address.id,
      updateAddressDto,
    );
    return newAddress;
  }

  remove(id: string) {
    const address = this.addressRepository.delete(id);
    if (!address) {
      throw new NotFoundException('Endereço não encontrado');
    }
  }
}
