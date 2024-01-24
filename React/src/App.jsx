import React, { useState, useEffect } from 'react';
import countryData from '../../resources/countryData.json';
import './App.css';

function App() {
  const [searchInput, setSearchInput] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const handleSearchInput = (event) => {
    const userInput = event.target.value;
    setSearchInput(userInput);

    const filteredResults = countryData.filter((country) =>
      country.name.toLowerCase().includes(userInput.toLowerCase())
    );

    setFilteredCountries(filteredResults);
  };

  const handleSuggestions = () => {
    const filteredResults = countryData.filter((country) =>
      country.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    setFilteredCountries(filteredResults);
  };

  const handleClearSuggestions = () => {
    setShowSuggestions(false);
    setFilteredCountries([]);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className='main'>
      <div className='title'>Country Data</div>
      <div>
        <input type="text" id="search" placeholder='Search here' onChange={handleSearchInput} />
        <button onClick={() => { handleSuggestions(); handleClearSuggestions(); }}>Search</button>

        {showSuggestions && (
          <ul>
            {filteredCountries.map((country) => (
              <li key={country.code}>{country.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
