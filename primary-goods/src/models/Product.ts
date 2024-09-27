import { database } from '../db/config';
import { ObjectId } from 'mongodb';

interface ProductType {
  _id: ObjectId;
  name: string;
  price: number;
  slug: string;
  description: string;
  thumbnail: string;
  images: string[];
}

const collection = database.collection<ProductType>('products');

export class Product {
  // Static method untuk mengambil semua produk dengan pagination
  static async findAll({ start = 0, limit = 10 }: { start: number, limit: number }): Promise<ProductType[]> {
    return await collection.find()
      .skip(start)
      .limit(limit)
      .toArray();
  }

  // Static method untuk mengambil produk berdasarkan slug
  static async findBySlug(slug: string): Promise<ProductType | null> {
    return await collection.findOne({ slug });
  }
}
