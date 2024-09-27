"use client";

import React, { useState, useEffect, useRef } from 'react';
import AddToWishlist from '@/components/AddToWishlist';
import { ObjectId } from 'mongodb';

interface ProductType {
  _id: ObjectId;
  name: string;
  price: number;
  slug: string;
  thumbnail: string;
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
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastProductRef = useRef<HTMLDivElement | null>(null);

  const loadMoreProducts = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMoreProducts();
  }, []);

  useEffect(() => {
    if (loading || !hasMore) return;

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMoreProducts();
      }
    }, options);

    if (lastProductRef.current) {
      observer.current.observe(lastProductRef.current);
    }
  }, [loading, hasMore]);

  const handleProductClick = (slug: string) => {
    window.location.href = `/products/${slug}`;
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {products.map((product, index) => (
        <div
          key={product._id.toString()}
          className="bg-white shadow-md rounded-lg p-4 relative group"
          ref={index === products.length - 1 ? lastProductRef : null}
        >
          <div className="relative">
            <img
              src={product.thumbnail}
              alt={product.name}
              className="w-full h-64 object-cover rounded-md cursor-pointer"
              onClick={() => handleProductClick(product.slug)}
            />

            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <AddToWishlist productId={product._id.toString()} />
            </div>
          </div>

          <div className="text-center mt-4">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-500 mt-2">$ {product.price}</p>
          </div>
        </div>
      ))}
      {loading && <div className="col-span-full text-center">Loading...</div>}
      {!hasMore && <div className="col-span-full text-center">No more products</div>}
    </div>
  );
};

export default ListProduct;
