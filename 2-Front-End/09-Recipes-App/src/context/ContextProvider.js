import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import contextCreate from './contextCreate';

export default function ContextProvider({ children }) {
  const [toggleSearch, setToggleSearch] = useState(true);
  const [ingredient, setIngredient] = useState();
  function mapFood(slicingTwelve) {
    return slicingTwelve.map((card, index) => (
      <div className="card" key={ index }>
        <Link to={ `/comidas/${card.idMeal}` }>
          <p data-testid={ `${index}-recipe-card` }>{card.strMeal}</p>
          <img
            className="card-img"
            data-testid={ `${index}-card-img` }
            src={ card.strMealThumb }
            alt=""
          />
          <p data-testid={ `${index}-card-name` }>{card.strMeal}</p>
        </Link>
      </div>
    ));
  }

  function mapDrink(slicingTwelve) {
    return slicingTwelve.map((card, index) => (
      <div className="card" key={ index }>
        <Link to={ `/bebidas/${card.idDrink}` }>
          <p data-testid={ `${index}-recipe-card` }>{card.strDrink}</p>
          <img
            className="card-img"
            data-testid={ `${index}-card-img` }
            src={ card.strDrinkThumb }
            alt=""
          />
          <p data-testid={ `${index}-card-name` }>{card.strDrink}</p>
        </Link>
      </div>
    ));
  }

  return (
    <contextCreate.Provider
      value={ {
        mapDrink,
        mapFood,
        setToggleSearch,
        toggleSearch,
        ingredient,
        setIngredient,
      } }
    >
      {children}
    </contextCreate.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
