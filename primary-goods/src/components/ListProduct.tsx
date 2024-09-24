"use client"
import React from 'react';
import AddToWishlist from '@/components/AddToWishlist';

interface Product {
  id: number;
  name: string;
  price: number | string;
  slug: string;
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

const ListProduct = async () => {
  // Ambil data produk dari API
  const products = await getProducts();
    console.log(products)
  const handleProductClick = (slug: string) => {
    window.location.href = `/products/${slug}`;
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
              src={product.thumbnail}
              alt={product.name}
              className="w-full h-64 object-cover rounded-md cursor-pointer"
              onClick={() => handleProductClick(product.slug)}
            />

            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <AddToWishlist />
            </div>
          </div>

          <div className="text-center mt-4">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-500 mt-2">$ {product.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListProduct;
