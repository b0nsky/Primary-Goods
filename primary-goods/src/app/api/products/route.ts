import { NextResponse } from 'next/server';
import { Product, ProductSchema } from '@/models/Product';

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

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const product = ProductSchema.safeParse(body);
        if (!product.success) {
            return NextResponse.json({ success: false, message: product.error.errors.map(e => e.message) }, { status: 400 });
        }

        const { slug } = product.data;

        const isSlugUnique = await Product.isSlugUnique(slug);
        if (!isSlugUnique) {
            return NextResponse.json({ success: false, message: 'Slug already exists' }, { status: 400 });
        }

        const productId = await Product.createProduct(product.data);
        return NextResponse.json({ success: true, productId });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Failed to create product', error }, { status: 500 });
    }
}
