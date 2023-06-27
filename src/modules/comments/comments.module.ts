import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { PrismaService } from 'src/database/prisma.service';
import { CommentRepository } from './repositories/comments.repository';
import { CommentPrismaRepository } from './repositories/prisma/comments.prisma.repository';

@Module({
  controllers: [CommentsController],
  providers: [
    CommentsService,
    PrismaService,
    {
      provide: CommentRepository,
      useClass: CommentPrismaRepository,
    },
  ],
  exports: [CommentsService],
})
export class CommentsModule {}
