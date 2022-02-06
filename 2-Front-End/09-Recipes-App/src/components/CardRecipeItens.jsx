import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchRecommendedFood, fetchRecommendedDrink } from '../services/fetchAPI';

export default function CardRecipeItens({ limit }) {
  const { pathname } = useLocation();
  const [page] = pathname.split('/').slice(1);

  const [recommendeds, setRecommendeds] = useState([]);

  useEffect(() => {
    async function recommendedFoods() {
      setRecommendeds(await fetchRecommendedFood());
    }
    async function recommendedDrinks() {
      setRecommendeds(await fetchRecommendedDrink());
    }
    if (page === 'comidas') {
      recommendedDrinks();
    } else {
      recommendedFoods();
    }
  }, [page]);

  switch (page) {
  case 'comidas':
    return (
      <div className="scroll-recommends">
        {recommendeds.slice(0, limit).map((recipe, index) => (
          <Link
            key={ recipe.idDrink }
            to={ `/bebidas/${recipe.idDrink}` }
          >
            <div
              className="recomendation-card"
              data-testid={ `${index}-recomendation-card` }
            >
              <img src={ recipe.strDrinkThumb } alt={ recipe.strDrink } width="100px" />
              <h6 data-testid={ `${index}-recomendation-title` }>
                { recipe.strDrink }
              </h6>
              <p>{ recipe.strAlcoholic }</p>
            </div>
          </Link>
        ))}
      </div>
    );
  case 'bebidas':
    return (
      <div className="scroll-recommends">
        {recommendeds.slice(0, limit).map((recipe, index) => (
          <Link
            key={ recipe.idDrink }
            to={ `/comidas/${recipe.idMeal}` }
          >
            <div
              className="recomendation-card"
              data-testid={ `${index}-recomendation-card` }
            >
              <img src={ recipe.strMealThumb } alt={ recipe.strMeal } width="100px" />
              <h6 data-testid={ `${index}-recomendation-title` }>
                { recipe.strMeal }
              </h6>
              <p>{ recipe.strCategory }</p>
            </div>
          </Link>
        ))}
      </div>
    );
  default:
    return (<p>Page invalida</p>);
  }
}

CardRecipeItens.propTypes = {
  limit: PropTypes.number,
}.isRequired;
