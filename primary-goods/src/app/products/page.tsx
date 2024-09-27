"use client";
import React, { useState, useEffect } from 'react';
import ListProduct from '@/components/ListProduct';
import { ObjectId } from 'mongodb';
import SearchBar from '@/components/Search';

interface ProductType {
  _id: ObjectId;
  name: string;
  price: number;
  slug: string;
  thumbnail: string;
  excerpt: string;
}

const getProducts = async (page: number, limit: number, search: string): Promise<ProductType[]> => {
  const res = await fetch(`/api/products?page=${page}&limit=${limit}&search=${search}`);
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return res.json();
};

const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const ProductsPage = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const loadMoreProducts = async () => {
    setLoading(true); // Aktifkan loading
    try {
      const newProducts = await getProducts(page, 10, searchQuery);
      if (newProducts.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prevProducts) => [...prevProducts, ...newProducts]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = debounce((value: string) => {
    setSearchQuery(value);
    setPage(1);
    setProducts([]);
    setHasMore(true);
  }, 200);

  useEffect(() => {
    loadMoreProducts();
  }, [searchQuery]);

  useEffect(() => {
    if (search === '') {
      setSearchQuery('');
    } else {
      handleSearch(search);
    }
  }, [search]);

  return (
    <div className="container mx-auto py-10">
      <SearchBar search={search} setSearch={setSearch} />
      <h2 className="text-3xl font-bold text-gray-700 mb-6">All Products</h2>
      <ListProduct
        products={products}
        hasMore={hasMore}
        loadMoreProducts={loadMoreProducts}
        loading={loading}
      />
    </div>
  );
};

export default ProductsPage;
