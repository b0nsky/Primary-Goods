import React from 'react';
import Link from 'next/link';

const LoginPage = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Login</h1>
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email / Username"
            className="block w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:border-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="block w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:border-blue-500"
          />
          <button className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-200">
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Dont' have an account?{' '}
          <Link href="/register" className="text-blue-500 hover:text-blue-700 transition">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
