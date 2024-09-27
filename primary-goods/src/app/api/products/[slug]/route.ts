import { NextResponse } from 'next/server'
import { database } from '../../../../db/config'

export async function GET(
    request: Request,
    { params }: { params: { slug: string } }
    ) {
    const productsCollection = database.collection('products')

    const product = await productsCollection.findOne({ slug: params.slug })
    if (!product)
        return NextResponse.json({ error: 'Product not found' }, { status: 404 })

    return NextResponse.json(product)
}
