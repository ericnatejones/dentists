import React, { useState, ChangeEvent, FormEvent } from 'react';
import MapComponent from '../components/Map'; // Adjust the path according to your project structure


const SearchDentists: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchActive, setSearchActive] = useState<boolean>(false);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchActive(true);
      // Trigger search logic here, such as API calls or state updates
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setSearchActive(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <div className={`transition-all duration-500 ease-in-out ${searchActive ? 'w-full md:w-3/4' : 'w-full md:w-1/2'}`}>
        <h1 className={`text-3xl md:text-5xl font-bold text-center mb-4 ${searchActive ? 'hidden' : 'block'}`}>
          Search for Dentists in
        </h1>
        <form onSubmit={handleSearch} className="flex items-center justify-center">
          <input
            type="text"
            placeholder="Enter a location..."
            value={searchQuery}
            onChange={handleInputChange}
            className={`w-full ${searchActive ? 'md:w-1/2' : 'md:w-full'} px-6 py-4 text-2xl md:text-3xl border border-gray-300 rounded-full focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-50 transition-all duration-500 ease-in-out`}
          />
          <button
            type="submit"
            className={`ml-4 px-6 py-4 bg-primary text-white text-xl md:text-2xl font-semibold rounded-full shadow-lg hover:bg-secondary focus:outline-none transition-all duration-500 ease-in-out ${searchActive ? 'hidden' : 'block'}`}
          >
            Search
          </button>
        </form>
      </div>

      {/* Conditional rendering of map and results based on searchActive */}
        <div className="mt-8 w-full">
        <h2 className="text-2xl md:text-3xl font-semibold">Map and Results</h2>

      {searchActive ? (
            <div className="map-container mb-12 shadow-lg rounded-lg overflow-hidden">
                <MapComponent searchQuery={searchQuery} searchActive={searchActive}/>
            </div>
            ):(
            <div className="text-center">
                <p className="mt-4 text-lg">Your search results will appear here.</p>
            </div>
      )}
        </div>
    </div>
  );
};

export default SearchDentists;
