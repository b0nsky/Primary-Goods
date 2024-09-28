"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    const emailOrUsername = formData.get('emailOrUsername') as string;
    const password = formData.get('password') as string;

    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailOrUsername, password }),
      });

      if (res.ok) {
        toast.success('Login successful!', {
          style: { backgroundColor: 'green', color: 'white' },
        });

        setTimeout(() => {
          router.push('/');
          setTimeout(() => {
            window.location.reload();
          }, 100);
        }, 2000);
      } else {
        const data = await res.json();
        setErrorMessage(data.error || 'Login failed');
        toast.error(data.error || 'Login failed');
      }
    } catch (error) {
      setErrorMessage('An unexpected error occurred');
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Login</h1>
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            name="emailOrUsername"
            type="text"
            placeholder="Email / Username"
            className="block w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:border-blue-500"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="block w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:border-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {errorMessage && (
          <div className="mt-4 text-red-500 text-center">
            {errorMessage}
          </div>
        )}

        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{' '}
          <Link href="/register" className="text-blue-500 hover:text-blue-700 transition">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
