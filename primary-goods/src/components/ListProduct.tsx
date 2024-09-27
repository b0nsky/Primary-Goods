"use client";

import React, { useState, useEffect } from 'react';
import AddToWishlist from '@/components/AddToWishlist';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ObjectId } from 'mongodb';

interface ProductType {
  _id: ObjectId;
  name: string;
  price: number;
  slug: string;
  thumbnail: string;
  excerpt: string;
}

const getProducts = async (page: number, limit: number): Promise<ProductType[]> => {
  const res = await fetch(`/api/products?page=${page}&limit=${limit}`);
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return res.json();
};

const ListProduct = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreProducts = async () => {
    try {
      const newProducts = await getProducts(page, 10);
      if (newProducts.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prevProducts) => [...prevProducts, ...newProducts]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setHasMore(false);
    }
  };

  useEffect(() => {
    loadMoreProducts();
  }, []);

  return (
    <InfiniteScroll
      dataLength={products.length}
      next={loadMoreProducts}
      hasMore={hasMore}
      loader={<div className="col-span-full text-center">Loading...</div>}
      endMessage={<div className="col-span-full text-center">No more products</div>}
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
    >
      {products.map((product) => (
        <div
          key={product._id.toString()}
          className="bg-white shadow-md rounded-lg p-4 relative group"
        >
          <div className="relative">
            <img
              src={product.thumbnail}
              alt={product.name}
              className="w-full h-64 object-cover rounded-md cursor-pointer"
              onClick={() => window.location.href = `/products/${product.slug}`}
            />

            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <AddToWishlist productId={product._id.toString()} />
            </div>
          </div>

          <div className="text-center mt-4">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-400 mt-2">{product.excerpt}</p>
            <p className="text-gray-500 mt-2">$ {product.price}</p>
          </div>
        </div>
      ))}
    </InfiniteScroll>
  );
};

export default ListProduct;
