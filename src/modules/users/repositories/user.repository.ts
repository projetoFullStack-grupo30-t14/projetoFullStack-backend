import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

export abstract class UserRepository {
  abstract create(data: CreateUserDto): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract findOne(id: string): Promise<User>;
  abstract findByEmail(
    email: string,
  ): Promise<User | undefined | null> | User | undefined | null;
  abstract findByToken(token: string): Promise<User | undefined | null>;
  abstract update(id: string, data: UpdateUserDto): Promise<User>;
  abstract updateToken(email: string, resetToken: string): Promise<void>;
  abstract updatePassword(id: string, password: string): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
