import { Exclude } from 'class-transformer';
import { randomUUID } from 'crypto';

export class User {
  readonly id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  date_of_birth: string;
  description: string;
  seller: boolean;
  readonly created_at: Date;

  @Exclude()
  password: string;

  constructor() {
    this.id = randomUUID();
    this.created_at = new Date();
  }
}
