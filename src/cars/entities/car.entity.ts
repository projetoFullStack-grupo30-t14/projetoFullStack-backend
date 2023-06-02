import { randomUUID } from 'crypto';

export class Car {
  readonly id: string;
  brand: string;
  model: string;
  year: number;
  fuel: 'flex' | 'hybrid' | 'electric';
  mileage: number;
  color: string;
  price_FIPE: number;
  price: number;
  description: string;
  cover_image: string;
  is_active: boolean;
  readonly created_at: Date;

  constructor() {
    this.id = randomUUID();
    this.is_active = true;
    this.created_at = new Date();
  }
}
