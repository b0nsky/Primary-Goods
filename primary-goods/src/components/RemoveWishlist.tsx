import React from 'react';

interface RemoveWishlistProps {
  userId: string;
  productId: string;
  onRemove: () => void;
}

const RemoveWishlist: React.FC<RemoveWishlistProps> = ({ userId, productId, onRemove }) => {
  const handleRemove = async () => {
    try {
      const response = await fetch('/api/wishlists', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, productId }),
      });

      if (!response.ok) {
        throw new Error('Failed to remove from wishlist');
      }

      onRemove();
    } catch (error) {
      console.error(error);
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
