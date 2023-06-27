import { IRequestUser } from './../cars/cars.controller';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentPrismaRepository } from './repositories/prisma/comments.prisma.repository';

@Injectable()
export class CommentsService {
  constructor(private commentRepository: CommentPrismaRepository) {}
  create(
    car_id: string,
    user: IRequestUser,
    createCommentDto: CreateCommentDto,
  ) {
    return this.commentRepository.create(createCommentDto, user.id, car_id);
  }

  findAllByCar(car_id: string) {
    const comments = this.commentRepository.findAllByCar(car_id);
    if (!comments) {
      throw new NotFoundException('Comentários não encontrados.');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
