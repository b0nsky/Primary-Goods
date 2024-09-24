"use client"; 

import React from 'react';
import { useRouter } from 'next/navigation'; 
import AddToWishlist from '@/components/AddToWishlist';  

const ListProduct = () => {
  const router = useRouter();

  const products = [
    { id: 1, name: 'Product 1', price: '$100', slug: 'product-1' },
    { id: 2, name: 'Product 2', price: '$120', slug: 'product-2' },
    { id: 3, name: 'Product 3', price: '$140', slug: 'product-3' },
    { id: 4, name: 'Product 4', price: '$160', slug: 'product-4' },
    { id: 5, name: 'Product 5', price: '$180', slug: 'product-5' },
    { id: 6, name: 'Product 6', price: '$200', slug: 'product-6' },
    { id: 7, name: 'Product 7', price: '$220', slug: 'product-7' },
    { id: 8, name: 'Product 8', price: '$240', slug: 'product-8' },
  ];

  const handleProductClick = (slug: string) => {
    router.push(`/products/${slug}`);  
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white shadow-md rounded-lg p-4 relative group"
        >
          <div className="relative">
            <img
              src="https://i.pinimg.com/564x/55/14/69/5514694b23da5777214fda088b3d57fb.jpg"
              alt={product.name}
              className="w-full h-64 object-cover rounded-md cursor-pointer"
              onClick={() => handleProductClick(product.slug)}
            />

            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <AddToWishlist />
            </div>
          </div>

          <h3 className="text-lg font-semibold mt-4">{product.name}</h3>
          <p className="text-gray-500">{product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ListProduct;
