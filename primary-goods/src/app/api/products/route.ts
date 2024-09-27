import { NextResponse } from 'next/server';
import { Product } from '@/models/Product';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const searchQuery = searchParams.get('search') || '';

    const start = (page - 1) * limit;

    const query = searchQuery 
        ? { name: { $regex: searchQuery, $options: 'i' } }
        : {};

    try {
        const products = await Product.findAll({ start, limit, query });
        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}
