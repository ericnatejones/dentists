import React, { useState, ChangeEvent, FormEvent } from 'react';
import MapComponent from '../components/Map'; // Adjust the path according to your project structure

const SearchDentists: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>(''); // Tracks input value
  const [searchQuery, setSearchQuery] = useState<string>(''); // Tracks submitted query
  const [searchActive, setSearchActive] = useState<boolean>(false);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setSearchQuery(inputValue); // Update searchQuery when form is submitted
      setSearchActive(true);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // Update inputValue on keystroke
  };

  return (
    <div className="items-center justify-center bg-white p-10 rounded-lg shadow-xl transition-all duration-500 ease-in-out">
      {/* Conditional rendering of heading and search form */}
      <div className={`transition-all duration-500 ease-in-out ${searchActive ? 'hidden' : 'w-full'}`}>
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-800 transition-all duration-500 ease-in-out">
          Search for Trusted Dentists
        </h1>

        <form onSubmit={handleSearch} className="flex items-center w-full">
          <input
            type="text"
            placeholder="Enter a location..."
            value={inputValue} // Bind input value to the input field
            onChange={handleInputChange} // Update inputValue on change
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

      {/* Conditional rendering of map and results based on searchActive */}
      {searchActive && (
            <MapComponent searchQuery={searchQuery} searchActive={searchActive} />
      )}
    </div>
  );
};

export default SearchDentists;
