import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface RemoveWishlistProps {
  productId: string;
  onRemove: () => void;
}

const RemoveWishlist: React.FC<RemoveWishlistProps> = ({ productId, onRemove }) => {
  const handleRemove = async () => {
    try {
      const response = await fetch('/api/wishlists', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) {
        throw new Error('Failed to remove from wishlist');
      }

      toast.success('Item removed from wishlist!');
      onRemove();
    } catch (error) {
      toast.error('Failed to remove item from wishlist');
      console.error('Error removing from wishlist:', error);
    }
  };

  return (
    <button
      onClick={handleRemove}
      className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
    >
      Remove from Wishlist
    </button>
  );
};

export default RemoveWishlist;
