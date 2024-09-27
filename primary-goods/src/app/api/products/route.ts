import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '5');

    const res = await fetch('http://localhost:3001/products');
    const products = await res.json();

    const start = (page - 1) * limit;
    const end = start + limit;

    const paginatedProducts = products.slice(start, end);

    return NextResponse.json(paginatedProducts);
}
