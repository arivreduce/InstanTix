import './SearchResult.css';

const SearchResult = ({ result, handleClick, setAttId }) => {
  return (
    <div
      className="search-result"
      onClick={(e) => {
        // console.log(e);
        // console.log(result);
        handleClick(e.target.innerText);
        setAttId(result.id);
      }}
    >
      {result.name}
    </div>
  );
};
export default SearchResult;
