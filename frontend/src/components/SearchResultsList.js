import './SearchResultsList.css';
import SearchResult from './SearchResult';

const SearchResultsList = ({ results, handleClick, setAttId }) => {
  return (
    <div className="results-list">
      {results.map((result, id) => {
        return (
          <SearchResult
            result={result}
            key={id}
            handleClick={handleClick}
            setAttId={setAttId}
          />
        );
      })}
    </div>
  );
};
export default SearchResultsList;
