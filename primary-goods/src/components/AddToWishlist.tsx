"use client";

import React, { useState, useEffect } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { toast } from 'react-toastify';

interface AddToWishlistProps {
  productId: string;
  userId?: string;
}

interface DecodedToken {
  userId: string;
}

const AddToWishlist: React.FC<AddToWishlistProps> = ({ productId, userId: initialUserId }) => {
  const [addedToWishlist, setAddedToWishlist] = useState(false);
  const [userId, setUserId] = useState<string | null>(initialUserId || null);

  const getTokenFromCookies = (): string | null => {
    const tokenCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='));
    return tokenCookie ? tokenCookie.split('=')[1] : null;
  };

  useEffect(() => {
    if (!userId) {
      const token = getTokenFromCookies();
      if (token) {
        try {
          const decoded: DecodedToken = JSON.parse(atob(token.split('.')[1]));
          setUserId(decoded.userId);
        } catch (error) {
          console.error('Failed to decode token', error);
        }
      }
    }
  }, [userId]);

  const handleWishlist = async () => {
    if (!userId || !productId) {
      toast.error('UserId and ProductId are required');
      return;
    }

    try {
      const response = await fetch('/api/wishlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, productId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.error || 'Failed to add to wishlist');
        return;
      }

      setAddedToWishlist(true);
      toast.success('Added to wishlist');
    } catch {
      toast.error('Something went wrong');
    }
  };

  return (
    <button
      className={`bg-yellow-500 text-white p-1 rounded-full transition-opacity duration-300 ${
        !userId ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      aria-label="Add to Wishlist"
      onClick={userId ? handleWishlist : () => toast.error('Please log in to add to wishlist')}
      disabled={!userId}
    >
      <AiFillStar className={`w-5 h-5 ${addedToWishlist ? 'text-yellow-300' : ''}`} />
    </button>
  );
};

export default AddToWishlist;
