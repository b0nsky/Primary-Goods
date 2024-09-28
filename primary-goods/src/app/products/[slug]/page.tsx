import React from 'react';
import { notFound } from 'next/navigation';
import AddToWishlist from '@/components/AddToWishlist';
import { ObjectId } from 'mongodb';

interface Product {
  _id: ObjectId;
  name: string;
  price: number | string;
  description: string;
  thumbnail: string;
  images: string[];
  slug: string;
}

const getProductBySlug = async (slug: string): Promise<Product | null> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${slug}`);

    if (!res.ok) {
      console.error('Failed to fetch product:', res.statusText);
      return null;
    }

    const product: Product = await res.json();

    return product || null;
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    return null;
  }
};

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product was not found.',
    };
  }

  return {
    title: `${product.name} - Primary Goods`,
    description: product.description,
  };
}

interface ProductDetailProps {
  params: { slug: string };
}

const ProductDetailPage = async ({ params }: ProductDetailProps) => {
  const { slug } = params;

  const product = await getProductBySlug(slug);

  if (!product) {
    return notFound();
  }

  const productIdString = product._id?.toString();

  if (!productIdString) {
    console.error('Product ID is missing or invalid');
    return notFound();
  }

  return (
    <div className="container mx-auto py-10 px-4 h-screen overflow-y-scroll scrollbar-hide">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">{product.name}</h1>

      <div className="flex flex-col lg:flex-row h-full">
        <div className="w-full lg:w-1/2 lg:pr-8 flex flex-col space-y-4">
          <img 
            src={product.thumbnail} 
            alt={product.name} 
            className="w-full h-[450px] object-cover rounded-md"
          />

          {product.images && (
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Other Images:</h3>
              <div className="grid grid-cols-2 gap-4">
                {product.images.map((image, index) => (
                  <img 
                    key={index} 
                    src={image} 
                    alt={`Product Image ${index + 1}`} 
                    className="w-full h-[200px] object-cover rounded-md"
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="w-full lg:w-1/2 flex flex-col justify-center px-6" style={{ marginTop: '-100px' }}>
          <h2 className="text-3xl font-semibold text-gray-800">{product.name}</h2>
          <p className="text-2xl font-bold text-gray-900 mt-6">$ {product.price}</p>

          <p className="text-lg text-gray-600 mt-4">{product.description}</p>

          <div className="mt-6 flex items-center space-x-2">
            <AddToWishlist productId={productIdString} />
            <span className="text-lg text-gray-700">Add to Wishlist</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
