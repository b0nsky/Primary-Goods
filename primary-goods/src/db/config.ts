require('dotenv').config();
import { MongoClient } from 'mongodb';

console.log('MongoDB URI:', process.env.MONGO_DB);

const uri = process.env.MONGO_DB;

if (!uri) {
    throw new Error('MongoDB connection string is not defined');
}

const client = new MongoClient(uri);
export const database = client.db('Primary-Goods');
