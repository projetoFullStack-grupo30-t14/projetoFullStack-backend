import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from '../../dto/create-user.dto';
import { User } from '../../entities/user.entity';
import { plainToInstance } from 'class-transformer';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { Address } from 'src/modules/addresses/entities/address.entity';

@Injectable()
export class UserPrismaRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateUserDto): Promise<User> {
    const foundUser = await this.findByEmail(data.email);
    if (foundUser) {
      throw new BadRequestException('Email já cadastrado');
    }
    
    const user = new User();
    Object.assign(user, {
      ...data,
    });

    const newAddress = new Address();
    Object.assign(newAddress, data.address);

    const newUser = await this.prisma.users.create({
      data: {
        ...data,
        address: {
          create: newAddress,
        },
      },
      include: {
        address: {
          select: {
            id: true,
            cep: true,
            state: true,
            city: true,
            street: true,
            number: true,
            complement: true,
          },
        },
      },
    });

    return plainToInstance(User, newUser);
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.users.findMany();
    return plainToInstance(User, users);
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.users.findUnique({
      where: { id },
    });
    return plainToInstance(User, user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.users.findUnique({
      where: { email },
    });
    return user;
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    const user = await this.prisma.users.update({
      where: { id },
      data: { ...data },
    });
    return plainToInstance(User, user);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.users.delete({
      where: { id },
    });
  }

  async updateToken(email: string, resetToken: string): Promise<void> {
    await this.prisma.users.update({
      where: { email },
      data: { reset_token: resetToken },
    });
  }
}
