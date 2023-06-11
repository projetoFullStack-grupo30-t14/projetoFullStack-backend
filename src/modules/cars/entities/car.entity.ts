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
  car_gallery: Car_image[];
  usersId: string;

  constructor() {
    this.id = randomUUID();
    this.is_active = true;
    this.created_at = new Date();
  }
}

export class Car_image {
  id: string;
  car_id: string;
  image: string;

  constructor() {
    this.id = randomUUID();
  }
}
