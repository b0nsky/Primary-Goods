import Banner from '@/components/Banner';
import DetailInfoEcommerce from '@/components/DetailInfo';
import FeaturedProduct from '@/components/FeaturedProduct';
import React from 'react';

const HomePage = () => {
  return (
    <div className="container mx-auto py-10">
      <Banner />
      <h2 className="text-3xl font-bold text-gray-700 mb-6">Featured Products</h2>
      <FeaturedProduct />
      <DetailInfoEcommerce/>
    </div>
  );
};

export default HomePage;
