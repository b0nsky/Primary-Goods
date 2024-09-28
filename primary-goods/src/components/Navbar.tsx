"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const getTokenFromCookies = (): string | null => {
    const tokenCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='));
    return tokenCookie ? tokenCookie.split('=')[1] : null;
  };

  useEffect(() => {
    const token = getTokenFromCookies();
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    document.cookie = 'token=; Max-Age=0; path=/';
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <div className="navbar bg-base-100 shadow-lg">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/products">Products</a>
            </li>
            {isLoggedIn && (
              <li>
                <a href="/wishlist">Wishlist</a>
              </li>
            )}
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-xl">Primary Goods</a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/products">Products</a>
          </li>
          {isLoggedIn && (
            <li>
              <a href="/wishlist">Wishlist</a>
            </li>
          )}
        </ul>
      </div>

      <div className="navbar-end">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="btn bg-red-500 hover:bg-red-700 text-white"
          >
            Logout
          </button>
        ) : (
          <a href="/login" className="btn bg-blue-500 hover:bg-blue-700 text-white">
            Login
          </a>
        )}
      </div>
    </div>
  );
};

export default Navbar;
