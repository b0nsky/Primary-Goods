import { database } from '../db/config';
import { ObjectId } from 'mongodb';
import { z } from 'zod';

export const ProductSchema = z.object({
  _id: z.instanceof(ObjectId).optional(),
  name: z.string().min(1, "Nama produk wajib diisi").nonempty(),
  slug: z.string().min(1, "Slug wajib diisi").nonempty(),
  description: z.string().optional(),
  excerpt: z.string().optional(),
  price: z.number().nonnegative("Harga harus berupa angka positif"),
  tags: z.array(z.string()).optional(),
  thumbnail: z.string().optional(),
  images: z.array(z.string()).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type ProductType = z.infer<typeof ProductSchema>;

const collection = database.collection<ProductType>('products');

export class Product {
  static async isSlugUnique(slug: string): Promise<boolean> {
    const product = await collection.findOne({ slug });
    return !product;
  }

  static async createProduct(product: ProductType): Promise<ObjectId> {
    ProductSchema.parse(product);

    const isUnique = await this.isSlugUnique(product.slug);
    if (!isUnique) {
      throw new Error("Slug sudah digunakan");
    }

    const result = await collection.insertOne(product);
    return result.insertedId;
  }

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
