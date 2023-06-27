import { CreateCommentDto } from '../dto/create-comment.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';
import { Comment } from '../entities/comment.entity';

export abstract class CommentRepository {
  abstract create(data: CreateCommentDto): Promise<Comment>;
  abstract findAll(): Promise<Comment[]>;
  abstract findOne(id: string): Promise<Comment>;
  abstract update(id: string, data: UpdateCommentDto): Promise<Comment>;
  abstract delete(id: string): Promise<void>;
}
