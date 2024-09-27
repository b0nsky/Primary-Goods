import { database } from '../db/config';
import { ObjectId } from 'mongodb';

interface UserType {
    _id?: ObjectId;
    name: string;
    username: string;
    email: string;
    password: string;
}

const usersCollection = database.collection<UserType>('users');

export class User {
    static async createUser(user: UserType): Promise<ObjectId> {
        const result = await usersCollection.insertOne(user);
        return result.insertedId;
    }

    static async findUserByEmail(email: string): Promise<UserType | null> {
        return await usersCollection.findOne({ email });
    }

    static async findOne(emailOrUsername: string): Promise<UserType | null> {
        return await usersCollection.findOne({
            $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
        });
    }
}
