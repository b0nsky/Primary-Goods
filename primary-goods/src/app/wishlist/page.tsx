"use client";
import React, { useEffect, useState } from 'react';
import RemoveWishlist from '@/components/RemoveWishlist';

interface Product {
  _id: string;
  name: string;
  price: number;
  thumbnail: string;
}

const getWishlistProducts = async (userId: string): Promise<Product[]> => {
  const res = await fetch(`/api/wishlists?userId=${userId}`);
  if (!res.ok) {
    throw new Error('Failed to fetch wishlist');
  }
  return res.json();
};

const WishlistPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setUserId(decodedToken.userId);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      getWishlistProducts(userId)
        .then(setProducts)
        .catch(error => console.error(error));
    }
  }, [userId]);

  const handleRemoveFromWishlist = async (productId: string) => {
    if (!userId) {
      console.error('UserId not found');
      return;
    }

    try {
      const response = await fetch(`/api/wishlists`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, productId }),
      });

      if (!response.ok) {
        throw new Error('Failed to remove from wishlist');
      }

      setProducts(products.filter(product => product._id !== productId));
    } catch (error) {
      console.error('Failed to remove product from wishlist', error);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Your Wishlist</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              src={product.thumbnail}
              alt={product.name}
              className="w-full h-72 object-cover"
            />
            <div className="p-4 flex flex-col items-center">
              <h3 className="text-lg font-semibold text-gray-800 text-center">{product.name}</h3>
              <p className="text-gray-500">$ {product.price}</p>

              <div className="mt-4">
                <RemoveWishlist 
                  userId={userId!}
                  productId={product._id}
                  onRemove={() => handleRemoveFromWishlist(product._id)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
