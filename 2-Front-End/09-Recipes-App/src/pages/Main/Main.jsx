import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import contextCreat from '../context/contextCreate';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ButtonComponent from '../components/ButtonComponent';

const URL_FOODS = 'https://www.themealdb.com/api/json/v1/1/';
const URL_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/';

const maxTwelve = 12;

export default function Main() {
  const { mapDrink, mapFood, toggleSearch, ingredient } = useContext(contextCreat);
  const [noFilterDrinkList, setNoFilterDrinkList] = useState();
  const [noFilterMealsList, setNoFilterMealsList] = useState();
  const [categoryFilter, setCategoryFilter] = useState('');
  const [drinkList, setDrink] = useState();
  const [mealsList, setMeals] = useState();
  const [loadingItems, setLoadingItems] = useState(true);

  const { pathname } = useLocation();

  useEffect(() => {
    async function fetchItems() {
      const { meals } = await (await fetch(`${URL_FOODS}search.php?s=`))
        .json();
      setMeals(meals);
      setNoFilterMealsList(meals);

      const { drinks } = await (await fetch(`${URL_DRINKS}search.php?s=`))
        .json();
      setDrink(drinks);
      setNoFilterDrinkList(drinks);
      setLoadingItems(false);
    }
    fetchItems();
  }, []);

  async function handleClick(category, typeOfFilter) {
    setCategoryFilter(category);
    if (typeOfFilter === 'drinks') {
      const { drinks } = await (
        await fetch(`${URL_DRINKS}filter.php?c=${category}`)).json();
      const slicedDrinks = drinks.slice(0, maxTwelve);
      const categoryDink = category === categoryFilter ? (
        noFilterDrinkList
      ) : (
        slicedDrinks
      );
      return setDrink(categoryDink);
    } const { meals } = await (
      await fetch(`${URL_FOODS}filter.php?c=${category}`)).json();
    const slicedMeals = meals.slice(0, maxTwelve);
    const categoryMeal = category === categoryFilter ? (
      noFilterMealsList
    ) : (
      slicedMeals
    );
    return setMeals(categoryMeal);
  }

  function recipeCards(result, typeResult) {
    const slicingTwelve = result.slice(0, maxTwelve);
    if (typeResult.includes('drinks')) return mapDrink(slicingTwelve);
    return mapFood(slicingTwelve);
  }

  function pathChange() {
    // Adicionei um condicional para renderizar a lista de receita filtrada por ingredientes!
    if (ingredient) {
      if (pathname === '/comidas') {
        return mapFood(ingredient.slice(0, maxTwelve));
      }
      return mapDrink(ingredient.slice(0, maxTwelve));
    }
    if (pathname === '/comidas') {
      return recipeCards(mealsList, 'comidas');
    }
    return recipeCards(drinkList, 'drinks');
  }
  function resetAll() {
    setDrink(noFilterDrinkList);
    setMeals(noFilterMealsList);
    setCategoryFilter('');
  }

  function renderDefaultRecipes() {
    return loadingItems ? 'Loading...'
      : (
        <div className="cardDisplay">
          <ButtonComponent
            handleClick={ handleClick }
            resetAll={ resetAll }
          />
          {pathChange()}
        </div>);
  }

  return (
    <div className="main">
      <Header />
      {toggleSearch && renderDefaultRecipes()}
      <Footer />
    </div>
  );
}
