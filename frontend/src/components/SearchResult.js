import './SearchResult.css';

const SearchResult = ({ result, handleClick }) => {
  return (
    <div
      className="search-result"
      onClick={(e) => {
        console.log(e);
        handleClick(e.target.innerText);
      }}
    >
      {result.name}
    </div>
  );
};
export default SearchResult;
