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
    return `This action returns all addresses`;
  }

  findOne(id: string) {
    return `This action returns a #${id} address`;
  }

  async update(user_id: string, updateAddressDto: UpdateAddressDto) {
    const address = await this.addressRepository.findOne(user_id);

    if (!address) {
      throw new NotFoundException('Endereço de usuário não encontrado');
    }
    const newAddress = this.addressRepository.update(
      address.id,
      updateAddressDto,
    );
    return newAddress;
  }

  remove(id: string) {
    return `This action removes a #${id} address`;
  }
}
