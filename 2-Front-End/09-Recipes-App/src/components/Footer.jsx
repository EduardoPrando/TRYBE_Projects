import React from 'react';
import { useHistory } from 'react-router';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();
  return (
    <footer data-testid="footer" className="footer">
      <button
        type="button"
        onClick={ () => history.push('/bebidas') }
      >
        <img src={ drinkIcon } alt="taça" data-testid="drinks-bottom-btn" />
      </button>
      <button
        type="button"
        onClick={ () => history.push('/explorar') }
      >
        <img
          src={ exploreIcon }
          alt="bussola"
          data-testid="explore-bottom-btn"
        />
      </button>
      <button
        type="button"
        onClick={ () => history.push('/comidas') }
      >
        <img src={ mealIcon } alt="comida" data-testid="food-bottom-btn" />
      </button>
    </footer>
  );
}

export default Footer;
