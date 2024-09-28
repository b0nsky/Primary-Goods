"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Product {
  id: number;
  name: string;
  price: number | string;
  thumbnail?: string;
  slug: string;
}

interface ProductSliderProps {
  products: Product[];
}

const ProductSlider: React.FC<ProductSliderProps> = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const displayedProducts = products.slice(0, 10);

  const nextSlide = () => {
    if (currentIndex + 5 < displayedProducts.length) {
      setCurrentIndex(currentIndex + 5);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 5);
    }
  };

  const handleSeeAll = () => {
    router.push('/products');
  };

  const handleProductClick = (slug: string) => {
    router.push(`/products/${slug}`);
  };

  return (
    <div className="relative w-full">
      <button
        onClick={prevSlide}
        className={`absolute left-0 z-10 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 transition ${currentIndex === 0 ? 'hidden' : ''}`}
        style={{ top: '50%', transform: 'translateY(-50%)' }}
      >
        &lt;
      </button>

      <div className="overflow-hidden w-full">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${(currentIndex / 5) * 100}%)` }}
        >
          {displayedProducts.map((product, i) => (
            <div key={i} className="min-w-[20%] p-4">
              <div className="bg-white shadow-md rounded-lg p-4 h-full flex flex-col justify-between">
                {product.thumbnail ? (
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-md cursor-pointer"
                    onClick={() => handleProductClick(product.slug)}
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 rounded-md"></div>
                )}
                <h3 className="text-lg font-semibold mt-4">{product.name}</h3>
                <p className="text-gray-500">$ {product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={nextSlide}
        className={`absolute right-0 z-10 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 transition ${currentIndex + 5 >= displayedProducts.length ? 'hidden' : ''}`}
        style={{ top: '50%', transform: 'translateY(-50%)' }}
      >
        &gt;
      </button>

      {currentIndex >= 5 && (
        <div className="text-center mt-4">
          <button
            onClick={handleSeeAll}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            See All Products
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductSlider;
