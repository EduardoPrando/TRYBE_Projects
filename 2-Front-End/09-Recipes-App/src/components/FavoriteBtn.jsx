import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import contextCreate from '../context/contextCreate';

// A DEMO OF LOCALSTORAGE

// const favoriteRecipes = [{
//   "id": "52771",
//   "type": "comida",
//   "area": "Italian",
//   "category": "Vegetarian",
//   "alcoholicOrNot": "",
//   "name": "Spicy Arrabiata Penne",
//   "image": "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
// }];
// localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

function getFromLocalStorage() {
  if (localStorage.getItem('favoriteRecipes')) {
    return JSON.parse(localStorage.getItem('favoriteRecipes'));
  }
  return [];
}

function saveRecipeIntoStorage(recipeData, recipeId) {
  const {
    strArea,
    strCategory,
    strAlcoholic,
    strMeal,
    strDrink,
    strMealThumb,
    strDrinkThumb,
  } = recipeData;

  const recipeToStorage = {
    id: recipeId,
    type: strArea ? 'comida' : 'bebida',
    area: strArea || '',
    category: strCategory,
    alcoholicOrNot: strAlcoholic || '',
    name: strMeal || strDrink,
    image: strMealThumb || strDrinkThumb,
  };

  const favoriteRecipes = getFromLocalStorage();

  if (favoriteRecipes.length > 0) {
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify([...favoriteRecipes, recipeToStorage]),
    );
  } else {
    localStorage.setItem('favoriteRecipes', JSON.stringify([recipeToStorage]));
  }
}

export default function FavoriteBtn() {
  const { recipeData } = useContext(contextCreate);
  const [isFavorite, setIsFavorite] = useState(false);
  const { pathname } = useLocation();
  const [recipeId] = pathname.split('/').slice(2);

  useEffect(() => {
    const favoriteRecipes = getFromLocalStorage();
    const recipeFinded = favoriteRecipes
      .find((favoriteRecipe) => favoriteRecipe.id === recipeId);

    if (recipeFinded) {
      setIsFavorite(true);
    }
  }, [recipeId]);

  function setAsFavorite() {
    setIsFavorite(true);
    saveRecipeIntoStorage(recipeData, recipeId);
  }

  function setAsUnfavorite() {
    setIsFavorite(false);
    const favoriteRecipes = getFromLocalStorage();
    const filtered = favoriteRecipes.filter((favorite) => favorite.id !== recipeId);
    if (filtered.length === 0) {
      localStorage.removeItem('favoriteRecipes');
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify(filtered));
    }
  }

  const unfavorited = () => (
    <button type="button" onClick={ setAsFavorite }>
      <img
        data-testid="favorite-btn"
        src={ whiteHeartIcon }
        alt="unfavorite"
        width="30px"
      />
    </button>
  );

  const favorited = () => (
    <button type="button" onClick={ setAsUnfavorite }>
      <img
        data-testid="favorite-btn"
        src={ blackHeartIcon }
        alt="favorite"
        width="30px"
      />
    </button>
  );

  return (isFavorite ? favorited() : unfavorited());
}
