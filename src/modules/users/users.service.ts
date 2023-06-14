import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UserRepository) {}
  create(createUserDto: CreateUserDto) {
    return this.usersRepository.create(createUserDto);
  }

  findAll() {
    return this.usersRepository.findAll();
  }

  findOne(id: string) {
    const user = this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.usersRepository.update(id, updateUserDto);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }

  remove(id: string) {
    const user = this.usersRepository.delete(id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
  }
}
