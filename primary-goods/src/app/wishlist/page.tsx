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

const getTokenFromCookies = (): string | null => {
  const tokenCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('token='));
  return tokenCookie ? tokenCookie.split('=')[1] : null;
};

const WishlistPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getTokenFromCookies();
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setUserId(decodedToken.userId);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      setLoading(true);
      getWishlistProducts(userId)
        .then(setProducts)
        .catch(error => console.error(error))
        .finally(() => setLoading(false));
    }
  }, [userId]);

  const handleRemoveFromWishlist = (productId: string) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product._id !== productId)
    );
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading wishlist...</p>;
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Your Wishlist</h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-600">You don't have any wishlist</p>
      ) : (
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
                    productId={product._id}
                    onRemove={() => handleRemoveFromWishlist(product._id)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
