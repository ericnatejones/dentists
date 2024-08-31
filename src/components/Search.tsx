import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';

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
  const [selectedCityIndex, setSelectedCityIndex] = useState<number>(-1); // Track selected city index
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setInputValue(query);

    if (query.trim()) {
      const matchingCities = cities.filter((city) =>
        city.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCities(matchingCities);
      setIsDropdownOpen(true);
      setSelectedCityIndex(-1); // Reset the selected index when typing
    } else {
      setFilteredCities([]);
      setIsDropdownOpen(false);
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      handleSearch(inputValue.trim());
      setIsDropdownOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isDropdownOpen) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedCityIndex((prevIndex) =>
          Math.min(prevIndex + 1, filteredCities.length - 1)
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedCityIndex((prevIndex) =>
          Math.max(prevIndex - 1, 0)
        );
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (selectedCityIndex >= 0) {
          const selectedCity = filteredCities[selectedCityIndex];
          setInputValue(selectedCity);
          setIsDropdownOpen(false);
          handleSearch(selectedCity);  // Trigger search directly
        } else if (inputValue.trim()) {
          handleSearch(inputValue.trim());
          setIsDropdownOpen(false);
        }
      }
    }
  };

  const handleCityClick = (city: string) => {
    setInputValue(city);
    setIsDropdownOpen(false);
    handleSearch(city);
  };

  const disableSubmit = inputValue.trim() === '' || (filteredCities.length > 0 && selectedCityIndex >= 0 && inputValue !== filteredCities[selectedCityIndex]);

  useEffect(() => {
    if (selectedCityIndex >= 0 && filteredCities.length > 0) {
      setInputValue(filteredCities[selectedCityIndex]);
    }
  }, [selectedCityIndex, filteredCities]);

  return (
    <form onSubmit={onSubmit} className="relative flex items-center w-full">
      <input
        type="text"
        placeholder="Enter a location..."
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="w-full px-6 py-4 text-xl md:text-2xl border border-gray-300 rounded-l-full focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-500 ease-in-out"
      />
      <button
        type="submit"
        disabled={disableSubmit}
        className={`px-8 py-4 bg-blue-600 text-white text-xl md:text-2xl font-semibold rounded-r-full shadow-lg transition-all duration-500 ease-in-out ${
          disableSubmit ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
        }`}
      >
        Search
      </button>

      {isDropdownOpen && filteredCities.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-b-lg shadow-lg mt-1 max-h-60 overflow-y-auto z-10">
        {filteredCities.map((city, index) => (
            <li
              key={city}
              onClick={() => handleCityClick(city)}
              className={`px-6 py-3 cursor-pointer transition-colors ${
                selectedCityIndex === index ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'
              }`}
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default SearchComponent;