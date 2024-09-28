"use client";
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import AddToWishlist from '@/components/AddToWishlist';
import { Spinner } from '@chakra-ui/react';
import { ObjectId } from 'mongodb';

interface ProductType {
  _id: ObjectId;
  name: string;
  price: number;
  slug: string;
  thumbnail?: string;
  excerpt?: string;
}

interface ListProductProps {
  products: ProductType[];
  hasMore: boolean;
  loadMoreProducts: () => void;
  loading: boolean;
}

const ListProduct: React.FC<ListProductProps> = ({ products, hasMore, loadMoreProducts, loading }) => {
  return (
    <InfiniteScroll
      dataLength={products.length}
      next={loadMoreProducts}
      hasMore={hasMore}
      loader={
        <div className="col-span-full text-center">
          {loading && <Spinner size="xl" color="blue.500" />}
        </div>
      }
      endMessage={<div className="col-span-full text-center">No more products</div>}
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
    >
      {products.map((product) => (
        <div
          key={product._id.toString()}
          className="bg-white shadow-md rounded-lg p-4 relative group"
        >
          <div className="relative">
            {product.thumbnail ? (
              <img
                src={product.thumbnail}
                alt={product.name}
                className="w-full h-64 object-cover rounded-md cursor-pointer"
                onClick={() => window.location.href = `/products/${product.slug}`}
              />
            ) : (
              <div className="w-full h-64 bg-gray-200 rounded-md"></div>
            )}

            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <AddToWishlist productId={product._id.toString()} />
            </div>
          </div>

          <div className="text-center mt-4">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            {product.excerpt && <p className="text-gray-400 mt-2">{product.excerpt}</p>}
            <p className="text-gray-500 mt-2">$ {product.price}</p>
          </div>
        </div>
      ))}
    </InfiniteScroll>
  );
};

export default ListProduct;
