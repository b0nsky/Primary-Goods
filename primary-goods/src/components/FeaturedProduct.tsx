import React from 'react';

const FeaturedProduct = () => {
  const products = [
    { id: 1, name: 'Product 1', price: '$100' },
    { id: 2, name: 'Product 2', price: '$120' },
    { id: 3, name: 'Product 3', price: '$140' },
    { id: 4, name: 'Product 4', price: '$160' },
    { id: 5, name: 'Product 5', price: '$180' },
    { id: 6, name: 'Product 6', price: '$200' },
    { id: 7, name: 'Product 7', price: '$220' },
    { id: 8, name: 'Product 8', price: '$240' },
    { id: 9, name: 'Product 9', price: '$260' },
    { id: 10, name: 'Product 10', price: '$280' },
    { id: 11, name: 'Product 11', price: '$300' },
    { id: 12, name: 'Product 12', price: '$320' },
  ];

  const featuredProducts = products.slice(0, 10);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {featuredProducts.map((product) => (
        <div key={product.id} className="bg-white shadow-md rounded-lg p-4">
          <img
            src="https://i.pinimg.com/564x/55/14/69/5514694b23da5777214fda088b3d57fb.jpg"
            alt={product.name}
            className="w-full h-54 object-cover rounded-md mb-4"
          />
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-500">{product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProduct;
