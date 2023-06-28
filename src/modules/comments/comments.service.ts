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
    return comments
  }

  findOne(id: number) {
    const comment = this.commentRepository.findOne(id);
    if (!comment) {
      throw new NotFoundException('Comentário não encontrado.');
    }
    return comment
  }

   update(id: number, updateCommentDto: UpdateCommentDto) {
    const comment = this.commentRepository.update(id, updateCommentDto)
    if (!comment) {
      throw new NotFoundException('Comentário não encontrado.')
    }
    return comment
  }

  remove(id: number) {
    const comment = this.commentRepository.delete(id)
    if (!comment) {
      throw new NotFoundException('Comentário não encontrado.')
    }
  }
}
