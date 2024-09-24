import React from 'react';

const Search = () => {
  return (
    <div className="mb-6 flex justify-end">
      <input
        type="text"
        placeholder="Search products..."
        className="border border-gray-300 rounded-lg p-2 w-full max-w-xs focus:outline-none focus:border-blue-500"
      />
    </div>
  );
};

export default Search;
