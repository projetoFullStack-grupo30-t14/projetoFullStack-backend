import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CommentRepository } from '../comments.repository';
import { CreateCommentDto } from '../../dto/create-comment.dto';
import { Comment } from '../../entities/comment.entity';
import { plainToInstance } from 'class-transformer';
import { UpdateCommentDto } from '../../dto/update-comment.dto';

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
        ...comment,
        user_id: user_id,
        car_id: car_id,
      },
    });

    return plainToInstance(Comment, newComment);
  }

  async findAllByCar(car_id: string): Promise<Comment[]> {
    const comments: Comment[] = await this.prisma.comments.findMany({
      where: { car_id },
    });
    return plainToInstance(Comment, comments);
  }

  async findOne(id: string): Promise<Comment> {
    const comment: Comment | null = await this.prisma.comments.findUnique({
      where: { id },
      include: {
        car: true,
        user: true,
      },
    });
    return plainToInstance(Comment, comment);
  }

  async update(id: string, data: UpdateCommentDto): Promise<Comment> {
    const comment = await this.prisma.comments.update({
      where: { id },
      data: { ...data },
    });
    return plainToInstance(Comment, comment);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.comments.delete({ where: { id } });
  }
}
