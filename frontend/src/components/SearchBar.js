import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import './SearchBar.css';
import CountrySelect from './CountrySelect';
import SearchResultsList from './SearchResultsList';

const SearchBar = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
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

  const handleClick = (value) => {
    setInput(value);
  };

  const searchBarClick = () => {
    const country = document.getElementsByClassName('form-control');
    console.log(country);
    alert(`You're looking for ${input} in ${country[0].value}!`);
  };
  return (
    <div className="search-bar-container">
      <h1 style={{ marginTop: '-100px', marginBottom: '2rem' }}>
        Find your favorite artist, sports team, or event!
      </h1>
      <CountrySelect />
      <div className="input-wrapper">
        <FaSearch id="search-icon" onClick={searchBarClick} />
        <input
          placeholder="Type to search..."
          value={input}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
      <SearchResultsList results={results} handleClick={handleClick} />
    </div>
  );
};
export default SearchBar;
