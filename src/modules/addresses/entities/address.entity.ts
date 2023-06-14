import { randomUUID } from 'crypto';

export class Address {
  readonly id: string;
  cep: number;
  state: string;
  city: string;
  street: string;
  number: number;
  complement: string;

  constructor() {
    this.id = randomUUID();
  }
}
