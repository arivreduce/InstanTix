import Active from '../images/filled.png';
import Inactive from '../images/unfilled.png';
import './ToggleFavorites.css';

const ToggleFavorites = () => {
  return (
    <>
      <div className="toggle-wrapper">
        <img className="active" src={Active} alt="yellow star" />
        <img className="inactive" src={Inactive} alt="black and white star" />
      </div>
    </>
  );
};
export default ToggleFavorites;
