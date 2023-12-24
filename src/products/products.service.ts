import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  products: Record<string, any>[];

  constructor() {
    this.products = [
      {
        id: 1,
        name: 'iPhone 15',
      },
      {
        id: 2,
        name: 'Samsung S23',
      },
      {
        id: 3,
        name: 'HP Pavilion 15',
      },
    ];
  }

  async getProducts() {
    try {
      return this.products;
    } catch (error) {
      throw error;
    }
  }
}
