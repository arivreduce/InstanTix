import './SearchResultsList.css';
import SearchResult from './SearchResult';

const SearchResultsList = ({ results, handleClick }) => {
  return (
    <div className="results-list">
      {results.map((result, id) => {
        return (
          <SearchResult result={result} key={id} handleClick={handleClick} />
        );
      })}
    </div>
  );
};
export default SearchResultsList;
