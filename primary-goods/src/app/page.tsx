import Banner from '@/components/Banner';
import DetailInfoEcommerce from '@/components/DetailInfo';
import FeaturedProduct from '@/components/FeaturedProduct';
import Navbar from '@/components/Navbar';
import React from 'react';

interface Product {
  id: number;
  name: string;
  price: number | string;
  thumbnail: string;
}

const getProducts = async (): Promise<Product[]> => {
  const res = await fetch('http://localhost:3000/api/products');
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  const products: Product[] = await res.json();
  return products;
};

const HomePage = async () => {
  const products = await getProducts();

  return (
    <div className="container mx-auto py-10" >
      <div className='mb-10'>
        <Navbar />
      </div>
        <Banner/>
        <h2 className="text-3xl font-bold text-gray-700 mb-6">Featured Products</h2>
        <FeaturedProduct products={products} />
        <DetailInfoEcommerce />
    </div>
  );
};


export default HomePage;
