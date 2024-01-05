import Active from '../images/filled.png';
import Inactive from '../images/unfilled.png';
import './ToggleFavorites.css';

const ToggleFavorites = ({ active, handleChangeActive }) => {
  return (
    <>
      <div className="toggle-wrapper">
        {active ? (
          <img
            className="active"
            src={Active}
            alt="yellow star"
            onClick={() => handleChangeActive()}
          />
        ) : (
          <img
            className="inactive"
            src={Inactive}
            alt="black and white star"
            onClick={() => handleChangeActive()}
          />
        )}
      </div>
    </>
  );
};
export default ToggleFavorites;
