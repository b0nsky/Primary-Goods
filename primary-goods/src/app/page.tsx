import Banner from '@/components/Banner';
import DetailInfoEcommerce from '@/components/DetailInfo';
import FeaturedProduct from '@/components/FeaturedProduct';
import React from 'react';

interface Product {
  id: number;
  name: string;
  price: number | string;
  thumbnail?: string;
  slug: string;
}

const getProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`);
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  const products: Product[] = await res.json();
  return products;
};

const HomePage = async () => {
  let products: Product[] = [];

  try {
    products = await getProducts();
  } catch (error) {
    console.error('Error fetching products:', error);
  }

  return (
    <div className="container mx-auto py-10">
      <Banner />
      <h2 className="text-3xl font-bold text-gray-700 mb-6">Featured Products</h2>
      {products.length > 0 ? (
        <FeaturedProduct products={products} />
      ) : (
        <p>No products available.</p>
      )}
      <DetailInfoEcommerce />
    </div>
  );
};

export default HomePage;
