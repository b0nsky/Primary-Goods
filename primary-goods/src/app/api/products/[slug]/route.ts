import { NextResponse } from 'next/server';
import { Product } from '@/models/Product';

export async function GET(
    request: Request,
    { params }: { params: { slug: string } }
    ) {
        try {
            const product = await Product.findBySlug(params.slug);

            if (!product) {
                return NextResponse.json({ error: 'Product not found' }, { status: 404 });
            }

            return NextResponse.json(product);
        } catch (error) {
            console.error('Error fetching product by slug:', error);
            return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
        }
    }
