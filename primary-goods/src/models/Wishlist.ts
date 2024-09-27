import { database } from '../db/config';
import { ObjectId } from 'mongodb';

interface WishlistType {
    _id?: ObjectId;
    userId: ObjectId;
    productId: ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const collection = database.collection<WishlistType>('wishlists');

export class Wishlist {
    static async addToWishlist(userId: string, productId: string) {
        const newWishlistItem = {
            userId: new ObjectId(userId),
            productId: new ObjectId(productId),
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        return await collection.insertOne(newWishlistItem);
    }

    static async deleteFromWishlist(userId: string, productId: string) {
        return await collection.deleteOne({
            userId: new ObjectId(userId),
            productId: new ObjectId(productId),
        });
    }

    static async findAllByUserId(userId: string) {
        return await collection.find({ userId: new ObjectId(userId) }).toArray();
    }

    static async findOne(query: object): Promise<WishlistType | null> {
        return await collection.findOne(query);
    }
}
