import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import './SearchBar.css';
import CountrySelect from './CountrySelect';

const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState('');

  const fetchData = (value) => {
    fetch(
      `https://app.ticketmaster.com/discovery/v2/attractions.json?&size=200&countryCode=US&apikey=x7FLnZ6Vxb976N6gD1A99dVqDaClGq7X`
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        const results = json._embedded.attractions.filter((user) => {
          return (
            value &&
            user &&
            user.name &&
            user.name.toLowerCase().includes(value)
          );
        });
        setResults(results);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };
  return (
    <div className="search-bar-container">
      <CountrySelect />
      <div className="input-wrapper">
        <FaSearch id="search-icon" />
        <input
          placeholder="Type to search..."
          value={input}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
    </div>
  );
};
export default SearchBar;
