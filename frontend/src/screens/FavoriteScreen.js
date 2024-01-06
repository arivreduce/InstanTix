import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './FavoriteScreen.css';
import {
  useDeleteFavMutation,
  useSearchAPIMutation,
} from '../slices/usersApiSlice';
import { toast } from 'react-toastify';

const FavoriteScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state?.myData;
  const userId = userData._id;
  console.log(userData);
  const [favorites, setFavorites] = useState(userData.favorites || []);
  const [deleteFav] = useDeleteFavMutation();
  const [search] = useSearchAPIMutation();
  const handleDelete = async (favId) => {
    try {
      await deleteFav({ userId, favId });
      setFavorites(favorites.filter((fav) => fav.favId !== favId));
      toast.success('Favorite deleted!');
    } catch (error) {
      console.log(error);
    }
  };
  const freshApiSearch = async (attId, filteredCountryCode, input, country) => {
    // e.preventDefault();
    try {
      const res = await search({ attId, filteredCountryCode }).unwrap();
      navigate('/results', {
        state: {
          myData: res,
          eventName: input,
          countryName: country,
          filteredCountryCodeName: filteredCountryCode,
          attIdName: attId,
        },
      });
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <>
      <h1>Favorites</h1>
      <div className="favlist">
        {favorites.map((fav, id) => (
          <article key={id} className="fav">
            <img src={fav.favData.imageURL} alt={fav.favData.eventName} />
            <h2>{fav.favData.eventName}</h2>
            <h4>{fav.favData.country}</h4>
            <button
              className="refresh-btn"
              onClick={() =>
                freshApiSearch(
                  fav.favData.attId,
                  fav.favData.filteredCountryCode,
                  fav.favData.eventName,
                  fav.favData.country
                )
              }
              style={{
                marginLeft: '5rem',
                marginTop: '1rem',
                marginBottom: '1rem',
                display: 'block',
              }}
            >
              Refresh Search
            </button>
            <button
              onClick={() => handleDelete(fav.favId)}
              className="delete-btn"
            >
              Delete
            </button>
          </article>
        ))}
      </div>
    </>
  );
};
export default FavoriteScreen;
