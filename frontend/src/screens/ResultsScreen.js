import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import './ResultsScreen.css';
import ToggleFavorites from '../components/ToggleFavorites';

const ResultsScreen = () => {
  const [active, setActive] = useState(false);
  const location = useLocation();
  const data = location.state?.myData;
  const convertDate = (date) => {
    const month = date.slice(5, 8);
    const day = date.slice(8, 11);
    const year = date.slice(0, 4);
    return `${month}${day}-${year}`;
  };
  console.log(data);

  const handleChangeActive = () => {
    setActive((previousStar) => {
      return !previousStar;
    });
  };
  return (
    <>
      <div className="titleWrapper">
        <div className="eventTitle">
          <h1>
            Event: {data._embedded.events[0]._embedded.attractions[0].name}
          </h1>
        </div>
        <div
          className="favoriteStar"
          style={{ marginTop: '3.2rem', marginLeft: '1rem' }}
        >
          <ToggleFavorites
            active={active}
            handleChangeActive={handleChangeActive}
          />
        </div>
      </div>
      <div className="eventlist">
        {data._embedded.events.map((event, id) => (
          <article key={id} className="event">
            <img src={event.images[0].url} alt={event.name} />
            <h2>{event.name}</h2>
            <h4>{convertDate(event.dates.start.localDate)}</h4>
            <h4>
              {event._embedded.venues[0].city.name},{' '}
              {event._embedded.venues[0].state.name}
            </h4>
            <a href={event.url} target="_blank">
              Buy now!
            </a>
          </article>
        ))}
      </div>
    </>
  );
};
export default ResultsScreen;
