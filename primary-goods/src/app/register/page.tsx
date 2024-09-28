"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const RegisterPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const username = formData.get('username') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const res = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, username, email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success('Successfully registered!', {
          style: { backgroundColor: 'green', color: 'white' },
        });

        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } else {
        if (Array.isArray(data.message)) {
          data.message.forEach((errorMessage: string) => {
            toast.error(errorMessage, {
              style: { backgroundColor: 'red', color: 'white' },
            });
          });
        } else {
          toast.error(data.message || 'Failed to register', {
            style: { backgroundColor: 'red', color: 'white' },
          });
        }
      }
    } catch (error) {
      toast.error('An unexpected error occurred', {
        style: { backgroundColor: 'red', color: 'white' },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Register</h1>
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        <form className="space-y-4" onSubmit={handleRegister}>
          <input
            name="name"
            type="text"
            placeholder="Name"
            required
            className="block w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:border-blue-500"
          />
          <input
            name="username"
            type="text"
            placeholder="Username"
            required
            className="block w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:border-blue-500"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="block w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:border-blue-500"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="block w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
