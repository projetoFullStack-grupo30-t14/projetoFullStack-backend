import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from '../../dto/create-user.dto';
import { User } from '../../entities/user.entity';
import { plainToInstance } from 'class-transformer';
import { UpdateUserDto } from '../../dto/update-user.dto';

@Injectable()
export class UserPrismaRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateUserDto): Promise<User> {
    const foundUser = await this.findByEmail(data.email);
    if (foundUser) {
      throw new BadRequestException('Email already in use');
    }
    const user = new User();
    Object.assign(user, {
      ...data,
    });
    const newUser = await this.prisma.users.create({
      data: { ...user },
    });
    return plainToInstance(User, newUser);
  }

  async findAll(): Promise<User[]> {
    const users: User[] = await this.prisma.users.findMany();
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
}
