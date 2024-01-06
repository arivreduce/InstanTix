import { useLocation } from 'react-router-dom';
import './FavoriteScreen.css';

const FavoriteScreen = () => {
  const location = useLocation();
  const userData = location.state?.myData;
  console.log(userData);
  console.log(userData.favorites);
  return (
    <>
      <h1>Favorites</h1>
      <div className="favlist">
        {userData.favorites.map((fav, id) => (
          <article key={id} className="fav">
            <img src={fav.favData.imageURL} alt={fav.favData.eventName} />
            <h2>{fav.favData.eventName}</h2>
            <h4>{fav.favData.country}</h4>
          </article>
        ))}
      </div>
    </>
  );
};
export default FavoriteScreen;
