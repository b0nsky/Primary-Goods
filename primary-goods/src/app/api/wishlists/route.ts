import { NextResponse } from 'next/server';
import { Wishlist } from '@/models/Wishlist';
import { Product } from '@/models/Product';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';

const verifyToken = (request: Request): string | null => {
  const tokenCookie = request.headers.get('cookie')
    ?.split('; ')
    .find(cookie => cookie.startsWith('token='));

  if (!tokenCookie) return null;

  const token = tokenCookie.split('=')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return (decoded as { userId: string }).userId;
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};

export async function GET(request: Request) {
  const userId = verifyToken(request);

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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
  } catch {
    return NextResponse.json({ error: 'Failed to fetch wishlist' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { productId } = await request.json();
  
  const userId = verifyToken(request);

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
  } catch {
    return NextResponse.json({ error: 'Failed to add to wishlist' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { productId } = await request.json();
  
  const userId = verifyToken(request);

  if (!userId || !productId) {
    return NextResponse.json({ error: 'UserId and ProductId are required' }, { status: 400 });
  }

  try {
    const result = await Wishlist.deleteFromWishlist(userId, productId);

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Wishlist item not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to remove from wishlist' }, { status: 500 });
  }
}
