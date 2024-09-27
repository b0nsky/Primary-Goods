import { NextResponse } from 'next/server';
import { database } from '../../../db/config';
import { ObjectId } from 'mongodb';

export async function POST(request: Request) {
  const { userId, productId } = await request.json();
  const wishlistCollection = database.collection('wishlists');

  if (!userId || !productId) {
    return NextResponse.json({ error: 'UserId and ProductId are required' }, { status: 400 });
  }

  const result = await wishlistCollection.insertOne({
    userId: new ObjectId(userId),
    productId: new ObjectId(productId),
    createdAt: new Date(),
  });

  return NextResponse.json({ success: true, wishlistId: result.insertedId });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'UserId is required' }, { status: 400 });
  }

  const wishlistCollection = database.collection('wishlists');
  const productsCollection = database.collection('products');

  const wishlistItems = await wishlistCollection.find({ userId: new ObjectId(userId) }).toArray();
  const productIds = wishlistItems.map(item => new ObjectId(item.productId));

  const products = await productsCollection.find({ _id: { $in: productIds } }).toArray();

  return NextResponse.json(products);
}

export async function DELETE(request: Request) {
  const { userId, productId } = await request.json();

  if (!userId || !productId) {
    return NextResponse.json({ error: 'UserId and ProductId are required' }, { status: 400 });
  }

  const wishlistCollection = database.collection('wishlists');

  const result = await wishlistCollection.deleteOne({
    userId: new ObjectId(userId),
    productId: new ObjectId(productId),
  });

  return NextResponse.json({ success: result.deletedCount > 0 });
}
