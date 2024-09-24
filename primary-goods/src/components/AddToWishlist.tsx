"use client";

import React, { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';

const AddToWishlist = () => {
  const [addedToWishlist, setAddedToWishlist] = useState(false);

  const handleWishlist = () => {
    setAddedToWishlist(true);
    console.log('Added to wishlist');
  };

  return (
    <button
      className="bg-yellow-500 text-white p-1 rounded-full transition-opacity duration-300"
      aria-label="Add to Wishlist"
      onClick={handleWishlist}
    >
      <AiFillStar className={`w-5 h-5 ${addedToWishlist ? 'text-yellow-300' : ''}`} />
    </button>
  );
};

export default AddToWishlist;
