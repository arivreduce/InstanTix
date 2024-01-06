import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import './FavoriteScreen.css';
import { useDeleteFavMutation } from '../slices/usersApiSlice';
import { toast } from 'react-toastify';

const FavoriteScreen = () => {
  const location = useLocation();
  const userData = location.state?.myData;
  const userId = userData._id;
  console.log(userData);
  const [favorites, setFavorites] = useState(userData.favorites || []);
  const [deleteFav] = useDeleteFavMutation();
  const handleDelete = async (favId) => {
    try {
      await deleteFav({ userId, favId });
      setFavorites(favorites.filter((fav) => fav.favId !== favId));
      toast.success('Favorite deleted!');
    } catch (error) {
      console.log(error);
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
            <button onClick={() => handleDelete(fav.favId)}>Delete</button>
          </article>
        ))}
      </div>
    </>
  );
};
export default FavoriteScreen;
