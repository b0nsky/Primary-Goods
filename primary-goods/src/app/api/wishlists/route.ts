import { NextResponse } from 'next/server';
import { database } from '../../../db/config';
import { ObjectId } from 'mongodb';

// Handle POST request - Tambah ke Wishlist
export async function POST(request: Request) {
  const { userId, productId } = await request.json();
  const wishlistCollection = database.collection('wishlists');

  // Tambahkan validasi untuk userId dan productId
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

// Handle GET request - List Wishlist
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  // Pastikan userId tidak null
  if (!userId) {
    return NextResponse.json({ error: 'UserId is required' }, { status: 400 });
  }

  const wishlistCollection = database.collection('wishlists');
  const productsCollection = database.collection('products');

  // Mengambil wishlist berdasarkan userId
  const wishlistItems = await wishlistCollection.find({ userId: new ObjectId(userId) }).toArray();
  const productIds = wishlistItems.map(item => new ObjectId(item.productId));

  // Mengambil produk berdasarkan productIds
  const products = await productsCollection.find({ _id: { $in: productIds } }).toArray();

  return NextResponse.json(products);
}

// Handle DELETE request - Hapus dari Wishlist
export async function DELETE(request: Request) {
  const { userId, productId } = await request.json();

  // Tambahkan validasi untuk userId dan productId
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
