import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private useService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.useService.findByEmail(email);
    if (user) {
      const passwordMatch = await compare(password, user.password);
      if (passwordMatch) {
        const { id, email } = user;
        return { id, email };
      }
    }
    return null;
  }

  async login(email: string) {
    const user = await this.useService.findByEmail(email);
    return {
      token: this.jwtService.sign({ email }, { subject: user.id }),
    };
  }
}
