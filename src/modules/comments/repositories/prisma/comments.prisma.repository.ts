import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CommentRepository } from '../comments.repository';
import { CreateCommentDto } from '../../dto/create-comment.dto';
import { Comment } from '../../entities/comment.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CommentPrismaRepository implements CommentRepository {
  constructor(private prisma: PrismaService) {}
  async create(
    data: CreateCommentDto,
    user_id: string,
    car_id: string,
  ): Promise<Comment> {
    const comment = new Comment();
    Object.assign(comment, {
      ...data,
    });

    const newComment = await this.prisma.comments.create({
      data: {
        content: comment.content,
        user_id: user_id,
        car_id: car_id,
      },
    });

    return plainToInstance(Comment, newComment); //se algum campo precisar ser ocultado (senha)
  }
  async findAll(): Promise<Comment[]> {
    const comments: Comment[] = await this.prisma.comments.findMany()
    return plainToInstance(Comment, comments);
  }
  findOne(id: string): Comment | Promise<Comment> {
    throw new Error('Method not implemented.');
  }
  update(id: string): Comment | Promise<Comment> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): void | Promise<void> {
    throw new Error('Method not implemented.');
  }
}
