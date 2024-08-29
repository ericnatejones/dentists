import React, { useState, ChangeEvent, FormEvent } from 'react';

interface SearchComponentProps {
  handleSearch: (query: string) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ handleSearch }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      handleSearch(inputValue.trim());
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex items-center w-full">
      <input
        type="text"
        placeholder="Enter a location..."
        value={inputValue}
        onChange={handleInputChange}
        className="w-full px-6 py-4 text-xl md:text-2xl border border-gray-300 rounded-l-full focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-500 ease-in-out"
      />
      <button
        type="submit"
        className="px-8 py-4 bg-blue-600 text-white text-xl md:text-2xl font-semibold rounded-r-full shadow-lg hover:bg-blue-700 focus:outline-none transition-all duration-500 ease-in-out"
      >
        Search
      </button>
    </form>
  );
};

export default SearchComponent;
