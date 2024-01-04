import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import SearchResultsList from '../components/SearchResultsList';

const SearchScreen = () => {
  const [results, setResults] = useState([]);
  return (
    <div>
      <SearchBar setResults={setResults} />
      <SearchResultsList results={results} />
    </div>
  );
};
export default SearchScreen;
