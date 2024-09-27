"use client";
import React, { useEffect, useState } from 'react';
import ListProduct from '@/components/ListProduct';
import { jwtDecode } from 'jwt-decode';

const ProductsPage = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setUserId(decoded.userId);
      } catch (error) {
        console.error('Failed to decode token', error);
      }
    }
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-3xl font-bold text-gray-700 mb-6">All Products</h2>
      {userId ? (
        <ListProduct userId={userId} />
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
};

export default ProductsPage;
