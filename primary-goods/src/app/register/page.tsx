"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/login');
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Register</h1>
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        <form className="space-y-4" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Name"
            className="block w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:border-blue-500"
          />
          <input
            type="text"
            placeholder="Username"
            className="block w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:border-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            className="block w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:border-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="block w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
