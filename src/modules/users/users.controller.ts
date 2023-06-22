import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JWTAuthGuard } from '../auth/jwt.auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(JWTAuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(JWTAuthGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JWTAuthGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @HttpCode(204)
  @UseGuards(JWTAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @HttpCode(200)
  @Post('resetPassword')
  async sendEmailPassword(@Body('email') email: string) {
    await this.usersService.sendEmailPassword(email);
    return { message: 'Email enviado.' };
  }

  @Patch('resetPassword/:token')
  async resetPassword(
    @Param('token') token: string,
    @Body('password') password: string,
  ) {
    await this.usersService.resetPassword(token, password);
    return { message: 'Senha alterada com sucesso.' };
  }
}
