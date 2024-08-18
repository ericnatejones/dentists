import React, { useState, ChangeEvent, FormEvent } from 'react';

interface SearchComponentProps {
  handleSearch: (query: string) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ handleSearch }) => {
  const [inputValue, setInputValue] = useState<string>(''); // Handle input locally

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // Update input value locally
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch(inputValue); // Pass the input value to the parent's handleSearch function
  };

  return (
    <div className="items-center justify-center bg-white p-10 rounded-lg shadow-xl transition-all duration-500 ease-in-out">
      <div className="w-full">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-800 transition-all duration-500 ease-in-out">
          Search for Trusted Dentists
        </h1>

        <form onSubmit={onSubmit} className="flex items-center w-full">
          <input
            type="text"
            placeholder="Enter a location..."
            value={inputValue} // Bind input value to the input field
            onChange={onInputChange} // Handle input change
            className="w-full px-6 py-4 text-xl md:text-2xl border border-gray-300 rounded-l-full focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-500 ease-in-out"
          />
          <button
            type="submit"
            className="px-8 py-4 bg-blue-600 text-white text-xl md:text-2xl font-semibold rounded-r-full shadow-lg hover:bg-blue-700 focus:outline-none transition-all duration-500 ease-in-out"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchComponent;
