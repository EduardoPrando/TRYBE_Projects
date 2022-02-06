import React, { useState, useEffect, useContext } from 'react';
// import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import contextCreate from '../context/contextCreate';

const URL_FOODS = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
const URL_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';

const maxTwelve = 12;

export default function Explore() {
  const { setIngredient } = useContext(contextCreate);
  const [drinkList, setDrink] = useState();
  const [loadingItems, setLoadingItems] = useState(true);
  const [mealsList, setMeals] = useState();

  const { pathname } = useLocation();
  const { push } = useHistory();

  useEffect(() => {
    // Busca Lista de ingredientes.
    async function fetchItems() {
      const { meals } = await (await fetch(URL_FOODS))
        .json();
      setMeals(meals);
      const { drinks } = await (await fetch(URL_DRINKS))
        .json();
      setDrink(drinks);
      setLoadingItems(false);
    }
    fetchItems();
  }, []);

  async function handleClick(ingrediente, url) {
    // Busca lista de receitas por igredientes.
    if (url === 'themealdb') {
      const response = await fetch(`https://www.${url}.com/api/json/v1/1/filter.php?i=${ingrediente}`);
      const data = await response.json();
      setIngredient(data.meals);
      push('/comidas');
    } else {
      const response = await fetch(`https://www.${url}.com/api/json/v1/1/filter.php?i=${ingrediente}`);
      const data = await response.json();
      setIngredient(data.drinks);
      push('/bebidas');
    }
  }

  function mapFood(slicingTwelve) {
    return slicingTwelve.map(({ strIngredient }, index) => (
      <div
        className="card"
        key={ index }
      >
        <button
          type="button"
          onClick={ () => handleClick(strIngredient, 'themealdb') }
          data-testid={ `${index}-ingredient-card` }
        >
          <p data-testid={ `${index}-card-name` }>{strIngredient}</p>
          <img
            data-testid={ `${index}-card-img` }
            src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
            alt={ `imagem do ingrediente ${strIngredient}` }
            style={ { height: '100px' } }
          />
        </button>
      </div>
    ));
  }

  function mapDrink(slicingTwelve) {
    return slicingTwelve.map(({ strIngredient1 }, index) => (
      <div
        className="card"
        key={ index }
      >
        <button
          type="button"
          onClick={ () => handleClick(strIngredient1, 'thecocktaildb') }
          data-testid={ `${index}-ingredient-card` }
        >
          <p data-testid={ `${index}-card-name` }>{strIngredient1}</p>
          <img
            data-testid={ `${index}-card-img` }
            src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
            alt={ `imagem do ingrediente ${strIngredient1}` }
            style={ { height: '100px' } }
          />
        </button>
      </div>
    ));
  }

  function recipeCards(result, typeResult) {
    const slicingTwelve = result.slice(0, maxTwelve);
    if (typeResult.includes('drinks')) return mapDrink(slicingTwelve);
    return mapFood(slicingTwelve);
  }

  function pathChange() {
    if (pathname === '/explorar/comidas/ingredientes') {
      return recipeCards(mealsList, 'comidas');
    }
    return recipeCards(drinkList, 'drinks');
  }

  function renderDefaultRecipes() {
    return loadingItems ? 'Loading...'
      : (
        <div className="cardDisplay">
          {pathChange()}
        </div>);
  }

  return (
    <div>
      <Header />
      {renderDefaultRecipes()}
      <Footer />
    </div>
  );
}
