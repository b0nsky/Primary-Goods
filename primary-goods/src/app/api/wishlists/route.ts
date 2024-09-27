import { NextResponse } from 'next/server';
import { Wishlist } from '@/models/Wishlist';
import { Product } from '@/models/Product';
import { ObjectId } from 'mongodb';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'UserId is required' }, { status: 400 });
  }

  try {
    const wishlistItems = await Wishlist.findAllByUserId(userId);

    const productIds = wishlistItems.map(item => new ObjectId(item.productId));

    const products = await Product.findAll({
      query: { _id: { $in: productIds } },
      start: 0,
      limit: productIds.length
    });

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch wishlist' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { userId, productId } = await request.json();

  if (!userId || !productId) {
    return NextResponse.json({ error: 'UserId and ProductId are required' }, { status: 400 });
  }

  try {
    const existingWishlistItem = await Wishlist.findOne({
      userId: new ObjectId(userId),
      productId: new ObjectId(productId),
    });

    if (existingWishlistItem) {
      return NextResponse.json({ error: 'Product already in wishlist' }, { status: 400 });
    }

    const newWishlistItem = await Wishlist.addToWishlist(userId, productId);

    return NextResponse.json({ success: true, wishlistId: newWishlistItem.insertedId });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add to wishlist' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { userId, productId } = await request.json();

  if (!userId || !productId) {
    return NextResponse.json({ error: 'UserId and ProductId are required' }, { status: 400 });
  }

  try {
    const result = await Wishlist.deleteFromWishlist(userId, productId);

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Wishlist item not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to remove from wishlist' }, { status: 500 });
  }
}
