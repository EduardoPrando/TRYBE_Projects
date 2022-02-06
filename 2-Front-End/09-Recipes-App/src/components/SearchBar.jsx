import React, { useContext, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import './SearchBar.css';
import contextCreate from '../context/contextCreate';

const URL_FOODS = 'https://www.themealdb.com/api/json/v1/1/';
const URL_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/';
const ERROR_MESSAGE_CHARACTER = 'Sua busca deve conter somente 1 (um) caracter';
const ERROR_MESSAGE = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';

export default function SearchBar() {
  const history = useHistory();
  const { pathname } = useLocation();

  const { mapDrink, mapFood, setToggleSearch, toggleSearch } = useContext(contextCreate);
  const [searchValue, setSearchText] = useState('');
  const [radioSelect, setRadioSelect] = useState('');
  const [showResult, setShowResult] = useState({
    show: {
      value: false,
      resultSearch: {},
    },
  });

  async function checkLength(url) {
    if (searchValue.length === 1) {
      const response = await (await fetch(`${url}${radioSelect}${searchValue}`))
        .json();
      return response;
    } return global.alert(ERROR_MESSAGE_CHARACTER);
  }

  const numberMax = 12;
  function recipeCards({ result }) {
    const slicingTwelve = result.slice(0, numberMax);
    if (pathname.includes('/bebidas')) return mapDrink(slicingTwelve);
    return mapFood(slicingTwelve);
  }

  function lengthMeals(result, typeResult) {
    if (!result || result.length === 0) return global.alert(ERROR_MESSAGE);
    if (result.length === 1) {
      if (typeResult === 'meals') {
        const idMeal = result[0];
        return history.push(`${pathname}/${idMeal.idMeal}`);
      }
      const [idDrink] = result;
      return history.push(`${pathname}/${idDrink.idDrink}`);
    }
    return setShowResult({
      show: {
        value: true,
        resultSearch: { result },
      },
    });
  }

  async function handleClick() {
    setToggleSearch(!toggleSearch);
    if (radioSelect === 'search.php?f=') {
      if (pathname.includes('/comidas')) {
        return checkLength(URL_FOODS);
      } return checkLength(URL_DRINKS);
    } if (pathname.includes('/comidas')) {
      const { meals } = await (await fetch(`${URL_FOODS}${radioSelect}${searchValue}`))
        .json();
      return lengthMeals(meals, 'meals');
    } const { drinks } = await (await fetch(`${URL_DRINKS}${radioSelect}${searchValue}`))
      .json();
    return lengthMeals(drinks, 'drinks');
  }

  return (
    <div className="search">
      <div>
        <input
          type="text"
          data-testid="search-input"
          onChange={
            ({ target }) => setSearchText(target.value)
          }
        />
      </div>
      <div>
        <label htmlFor="ingredient">
          Ingrediente
          <input
            type="radio"
            id="ingredient"
            name="searchBar"
            value="filter.php?i="
            data-testid="ingredient-search-radio"
            onChange={
              ({ target }) => setRadioSelect(target.value)
            }
          />
        </label>

        <label htmlFor="nome">
          Nome
          <input
            type="radio"
            id="nome"
            name="searchBar"
            data-testid="name-search-radio"
            value="search.php?s="
            onChange={
              ({ target }) => setRadioSelect(target.value)
            }
          />
        </label>
        <label htmlFor="firstLetter">
          Primeira Letra
          <input
            type="radio"
            id="firstLetter"
            name="searchBar"
            value="search.php?f="
            data-testid="first-letter-search-radio"
            onChange={
              ({ target }) => setRadioSelect(target.value)
            }
          />
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => handleClick() }
      >
        Buscar
      </button>
      <div className="cardDisplay">
        { showResult.show.value && recipeCards(showResult.show.resultSearch) }
      </div>
    </div>
  );
}
