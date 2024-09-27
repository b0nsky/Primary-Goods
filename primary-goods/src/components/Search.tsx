"use client";
import React from 'react';

interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ search, setSearch }) => {
  return (
    <div className="mb-6 flex justify-end">
      <form onSubmit={(e) => e.preventDefault()} className="flex w-full max-w-xs">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:border-blue-500"
        />
      </form>
    </div>
  );
};

export default SearchBar;
