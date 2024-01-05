import { FaSearch } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchAPIMutation } from '../slices/usersApiSlice';
import { toast } from 'react-toastify';
import './SearchBar.css';
import CountrySelect from './CountrySelect';
import SearchResultsList from './SearchResultsList';

const SearchBar = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const [attId, setAttId] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [search, { isLoading }] = useSearchAPIMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/search');
    }
  }, [userInfo, navigate]);

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
        console.log(results[0].id);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  const handleClick = (value) => {
    setInput(value);
  };

  const submitHandler = async (e) => {
    const country = document.getElementsByClassName('form-control')[0].value;
    e.preventDefault();
    try {
      const res = await search({ attId, country }).unwrap();
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
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
        <FaSearch id="search-icon" onClick={submitHandler} />
        <input
          placeholder="Type to search..."
          value={input}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
      <SearchResultsList
        results={results}
        handleClick={handleClick}
        setAttId={setAttId}
      />
    </div>
  );
};
export default SearchBar;
