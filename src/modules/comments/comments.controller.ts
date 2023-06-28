import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CurrentUser } from '../users/user.decorator';
import { IRequestUser } from '../cars/cars.controller';
import { JWTAuthGuard } from '../auth/jwt.auth.guard';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post(':car_id')
  @UseGuards(JWTAuthGuard)
  create(
    @Param('car_id') car_id: string,
    @CurrentUser() user: IRequestUser,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentsService.create(car_id, user, createCommentDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('car/:car_id')
  findAllByCar(@Param('car_id') car_id: string) {
    return this.commentsService.findAllByCar(car_id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JWTAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  @UseGuards(JWTAuthGuard)
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(id, updateCommentDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  @UseGuards(JWTAuthGuard)
  remove(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }
}
