import React, { useState, ChangeEvent, FormEvent } from 'react';

interface SearchComponentProps {
  handleSearch: (query: string) => void;
}

const cities = [
  "Salt Lake City, UT", "West Valley City, UT", "West Jordan, UT", 
  "Provo, UT", "St. George, UT", "Orem, UT", "Sandy, UT", "Lehi, UT", 
  "Ogden, UT", "South Jordan, UT", "Layton, UT", "Millcreek, UT", 
  "Herriman, UT", "Taylorsville, UT", "Eagle Mountain, UT", "Logan, UT", 
  "Saratoga Springs, UT", "Draper, UT", "Murray, UT", "Spanish Fork, UT", 
  "Riverton, UT", "Bountiful, UT", "Cedar City, UT", "Tooele, UT", 
  "Roy, UT", "American Fork, UT", "Kearns, UT", "Pleasant Grove, UT", 
  "Syracuse, UT", "Midvale, UT", "Springville, UT", "Clearfield, UT", 
  "Washington, UT", "Kaysville, UT", "Cottonwood Heights, UT", 
  "Holladay, UT", "Magna, UT", "South Salt Lake, UT", "Farmington, UT", 
  "Payson, UT", "West Haven, UT", "Hurricane, UT", "Clinton, UT", 
  "North Salt Lake, UT", "North Ogden, UT", "Highland, UT", 
  "Brigham City, UT", "Bluffdale, UT", "Heber, UT", "South Ogden, UT", 
  "Santaquin, UT", "Centerville, UT", "Grantsville, UT", "Smithfield, UT", 
  "Vineyard, UT", "Mapleton, UT", "West Point, UT", "Tremonton, UT", 
  "Lindon, UT", "North Logan, UT", "Woods Cross, UT", "Pleasant View, UT", 
  "Hyrum, UT", "Salem, UT", "Vernal, UT", "Stansbury Park, UT", "Alpine, UT", 
  "Ivins, UT", "Cedar Hills, UT", "Hooper, UT", "Providence, UT", 
  "Riverdale, UT", "Washington Terrace, UT", "Summit Park, UT", 
  "Plain City, UT", "Santa Clara, UT", "Enoch, UT", "Nibley, UT", 
  "Richfield, UT", "Price, UT", "Park City, UT", "South Weber, UT", 
  "Farr West, UT", "Roosevelt, UT", "Nephi, UT", "Harrisville, UT", 
  "Ephraim, UT", "Midway, UT", "Fruit Heights, UT", "Perry, UT", 
  "West Bountiful, UT", "Snyderville, UT", "Hyde Park, UT", 
  "White City, UT", "Sunset, UT", "Kanab, UT", "Moab, UT", "Elk Ridge, UT", 
  "Morgan, UT", "La Verkin, UT"
];

const SearchComponent: React.FC<SearchComponentProps> = ({ handleSearch }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [isValidCity, setIsValidCity] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value) {
      const filtered = cities.filter(city =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCities(filtered);
      setShowSuggestions(true);
      setIsValidCity(filtered.includes(value));
    } else {
      setFilteredCities([]);
      setShowSuggestions(false);
      setIsValidCity(false);
    }
  };

  const handleSelectCity = (city: string) => {
    setInputValue(city);
    setFilteredCities([]);
    setShowSuggestions(false);
    setIsValidCity(true);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValidCity) {
      handleSearch(inputValue.trim());
    }
  };

  return (
    <form onSubmit={onSubmit} className="relative flex items-center w-full">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Enter a location..."
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          className="w-full px-6 py-4 text-xl md:text-2xl border border-gray-300 rounded-l-full focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-500 ease-in-out"
        />
        {showSuggestions && filteredCities.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-b-md mt-1 max-h-60 overflow-y-auto shadow-lg">
            {filteredCities.map((city, index) => (
              <li
                key={index}
                onClick={() => handleSelectCity(city)}
                className="px-4 py-2 cursor-pointer hover:bg-blue-100 transition-colors duration-200"
              >
                {city}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        type="submit"
        className={`px-8 py-4 text-xl md:text-2xl font-semibold rounded-r-full shadow-lg focus:outline-none transition-all duration-500 ease-in-out ${
          isValidCity ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-400 text-gray-700 cursor-not-allowed'
        }`}
        disabled={!isValidCity}
      >
        Search
      </button>
    </form>
  );
};

export default SearchComponent;