import { database } from '../db/config';
import { ObjectId } from 'mongodb';
import { z } from 'zod';

const UserSchema = z.object({
    _id: z.instanceof(ObjectId).optional(),
    name: z.string(),
    username: z.string().min(1, "Username wajib diisi").nonempty(),
    email: z.string().email("Format email tidak valid").nonempty(),
    password: z.string().min(5, "Password minimal 5 karakter"),
});

export type UserType = z.infer<typeof UserSchema>;

const usersCollection = database.collection<UserType>('users');

export class User {
    static async isEmailOrUsernameUnique(email: string, username: string): Promise<{ isEmailUnique: boolean; isUsernameUnique: boolean }> {
        const emailCheck = await usersCollection.findOne({ email });
        const usernameCheck = await usersCollection.findOne({ username });
    
        return {
            isEmailUnique: !emailCheck,
            isUsernameUnique: !usernameCheck,
        };
    }

    static async createUser(user: UserType): Promise<ObjectId> {
    
        UserSchema.parse(user);

        const { isEmailUnique, isUsernameUnique } = await this.isEmailOrUsernameUnique(user.email, user.username);

        if (!isEmailUnique) {
            throw new Error("Email sudah digunakan");
        }
        
        if (!isUsernameUnique) {
            throw new Error("Username sudah digunakan");
        }

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
