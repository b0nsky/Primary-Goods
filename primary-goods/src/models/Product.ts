import { database } from '../db/config';
import { ObjectId } from 'mongodb';

interface ProductType {
  _id: ObjectId;
  name: string;
  slug: string;
  description: string;
  excerpt:string,
  price: number;
  tags:string[],
  thumbnail: string;
  images: string[];
}

const collection = database.collection<ProductType>('products');

export class Product {
  static async findAll({ start = 0, limit = 10, query = {} }: { start: number, limit: number, query?: object }): Promise<ProductType[]> {
    return await collection.find(query)
      .skip(start)
      .limit(limit)
      .toArray();
  }

  static async findBySlug(slug: string): Promise<ProductType | null> {
    return await collection.findOne({ slug });
  }
}
