import { NextResponse } from 'next/server';
import { Product } from '@/models/Product';

export async function GET(
    request: Request,
    { params }: { params: { slug: string } }
    ) {
    const product = await Product.findBySlug(params.slug);
    
    if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
    }
