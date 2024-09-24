import React from 'react';
import AddToWishlist from '@/components/AddToWishlist';

const product = {
  name: 'Product 1',
  slug: 'product-1',
  description: 'This is the detailed description of the product. It provides information about features and specifications.',
  excerpt: 'A short product description.',
  price: 100,
  tags: ['New Arrival', 'Best Seller'],
  thumbnail: 'https://i.pinimg.com/564x/55/14/69/5514694b23da5777214fda088b3d57fb.jpg',
  images: ['https://i.pinimg.com/564x/55/14/69/5514694b23da5777214fda088b3d57fb.jpg', 'https://i.pinimg.com/564x/55/14/69/5514694b23da5777214fda088b3d57fb.jpg', 'https://i.pinimg.com/564x/55/14/69/5514694b23da5777214fda088b3d57fb.jpg', 'https://i.pinimg.com/564x/55/14/69/5514694b23da5777214fda088b3d57fb.jpg'],
};

const ProductDetailPage = () => {
  return (
    <div className="container mx-auto py-10 px-4 h-screen overflow-hidden">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Product Detail</h1>

      <div className="flex flex-col lg:flex-row h-full">
        <div className="w-full lg:w-1/2 lg:pr-8 flex flex-col space-y-6">
          <img 
            src={product.thumbnail} 
            alt={product.name} 
            className="w-full h-[500px] object-cover rounded-md"
          />

          {product.images && (
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Other Images:</h3>
              <div className="grid grid-cols-2 gap-4">
                {product.images.map((image, index) => (
                  <img 
                    key={index} 
                    src={image} 
                    alt={`Product Image ${index + 1}`} 
                    className="w-full h-48 object-cover rounded-md" 
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="w-full lg:w-1/2 flex items-center" style={{ marginTop: '-300px' }}>
          <div className="flex flex-col justify-center" style={{ height: '500px' }}>
            <h2 className="text-3xl font-semibold text-gray-800">{product.name}</h2>
            <p className="text-2xl font-bold text-gray-900 mt-6">${product.price}</p>

            <p className="text-lg text-gray-600 mt-4">{product.description}</p>

            <p className="text-sm text-gray-500 italic mt-2">"{product.excerpt}"</p>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-700">Tags:</h3>
              <div className="flex flex-wrap space-x-2">
                {product.tags.map((tag, index) => (
                  <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">{tag}</span>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <AddToWishlist />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
