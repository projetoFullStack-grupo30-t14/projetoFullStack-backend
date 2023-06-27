import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CurrentUser } from '../users/user.decorator';
import { IRequestUser } from '../cars/cars.controller';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post(':car_id')
  create(
    @Param('car_id') car_id: string,
    @CurrentUser() user: IRequestUser,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentsService.create(createCommentDto);
  }

  @Get(':car_id')
  findAllByCar(@Param('car_id') car_id: string) {
    return this.commentsService.findAllByCar(car_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
