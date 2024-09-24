import React from 'react';
import RemoveWishlist from '@/components/RemoveWishlist';

const wishlistProducts = [
  {
    id: 1,
    name: 'Product 1',
    price: '$100',
    thumbnail: 'https://i.pinimg.com/564x/55/14/69/5514694b23da5777214fda088b3d57fb.jpg',
  },
  {
    id: 2,
    name: 'Product 2',
    price: '$120',
    thumbnail: 'https://i.pinimg.com/564x/55/14/69/5514694b23da5777214fda088b3d57fb.jpg',
  },
  {
    id: 3,
    name: 'Product 3',
    price: '$140',
    thumbnail: 'https://i.pinimg.com/564x/55/14/69/5514694b23da5777214fda088b3d57fb.jpg',
  },
  {
    id: 4,
    name: 'Product 4',
    price: '$160',
    thumbnail: 'https://i.pinimg.com/564x/55/14/69/5514694b23da5777214fda088b3d57fb.jpg',
  },
  {
    id: 5,
    name: 'Product 5',
    price: '$180',
    thumbnail: 'https://i.pinimg.com/564x/55/14/69/5514694b23da5777214fda088b3d57fb.jpg',
  },
  {
    id: 6,
    name: 'Product 6',
    price: '$200',
    thumbnail: 'https://i.pinimg.com/564x/55/14/69/5514694b23da5777214fda088b3d57fb.jpg',
  },
];

const WishlistPage = () => {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Your Wishlist</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistProducts.map((product) => (
          <div key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              src={product.thumbnail}
              alt={product.name}
              className="w-full h-72 object-cover"
            />
            <div className="p-4 flex flex-col items-center">
              <h3 className="text-lg font-semibold text-gray-800 text-center">{product.name}</h3>
              <p className="text-gray-500">{product.price}</p>

              <div className="mt-4">
                <RemoveWishlist/>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
