import ListProduct from '@/components/ListProduct';
import Search from '@/components/Search';
import React from 'react';

const ProductsPage = () => {
  return (
    <div className="container mx-auto py-10">
      <Search />
      <h2 className="text-3xl font-bold text-gray-700 mb-6">All Products</h2>
      <ListProduct />
    </div>
  );
};

export default ProductsPage;
