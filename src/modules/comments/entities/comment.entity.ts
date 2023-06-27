import { randomUUID } from 'crypto';

export class Comment {
  readonly id: string;
  content: string;
  readonly created_at: Date;

  user_id: string;
  car_id: string;

  constructor() {
    this.id = randomUUID();
    this.created_at = new Date();
  }
}
