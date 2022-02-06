import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

const maxFive = 5;

const URL_FOODS = 'https://www.themealdb.com/api/json/v1/1/';
const URL_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/';

export default function ButtonComponent({ handleClick, resetAll }) {
  const { pathname } = useLocation();
  const [loadingButtons, setLoadingButtons] = useState(true);
  const [buttons, setButtons] = useState({
    meals: '',
    drinks: '',
  });

  useEffect(() => {
    async function fetchButtons() {
      const { meals } = await (await fetch(`${URL_FOODS}list.php?c=list`))
        .json();
      const { drinks } = await (await fetch(`${URL_DRINKS}list.php?c=list`))
        .json();
      setButtons({
        meals,
        drinks,
      });
      setLoadingButtons(false);
    }
    fetchButtons();
  }, []);

  function recipeButtons(result, typeOfFilter) {
    const slicingFiveCategory = result.slice(0, maxFive);
    return slicingFiveCategory.map(({ strCategory }, index) => (
      <div key={ index }>
        <button
          type="button"
          data-testid={ `${strCategory}-category-filter` }
          onClick={ () => handleClick(strCategory, typeOfFilter) }
        >
          {strCategory}
        </button>
      </div>
    ));
  }

  function pathChangeButton() {
    const { meals, drinks } = buttons;
    if (pathname.includes('comidas')) {
      return recipeButtons(meals);
    } return recipeButtons(drinks, 'drinks');
  }

  return (
    loadingButtons ? 'Loading...'
      : (
        <div className="cardDisplay">
          <button
            type="button"
            onClick={ resetAll }
            data-testid="All-category-filter"
          >
            All
          </button>
          {pathChangeButton()}
        </div>)
  );
}

ButtonComponent.propTypes = {
  handleClick: PropTypes.func.isRequired,
  resetAll: PropTypes.func.isRequired,
};
