import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import './recipesDone.css';

const treeSeconds = 3000;

const copy = require('clipboard-copy');

export default function RecipesFavorite() {
  const history = useHistory();
  const [favoriteRecipes, setFavoriteRecipes] = useState();
  const [noFilterFavoriteRecipes, setNoFilterFavoriteRecipes] = useState();
  const [loading, setLoading] = useState(true);
  const [copyLoading, setCopyLoading] = useState(false);

  useEffect(() => {
    function getLocalStorage() {
      const getItem = JSON.parse(localStorage.getItem('favoriteRecipes'));
      setFavoriteRecipes(getItem);
      setNoFilterFavoriteRecipes(getItem);
    }
    getLocalStorage();
    setLoading(false);
  }, []);

  function handleClickFilter(typeFilter) {
    const recipeFilter = noFilterFavoriteRecipes
      .filter((recipe) => recipe.type.includes(typeFilter));
    setFavoriteRecipes(recipeFilter);
    setLoading(false);
  }

  function handleRemoveFavorite(id) {
    const newFavoriteItems = favoriteRecipes
      .filter((recipe) => recipe.id !== id);
    setFavoriteRecipes(newFavoriteItems);
    setNoFilterFavoriteRecipes(newFavoriteItems);
    const stringifyFavorite = JSON.stringify(newFavoriteItems);
    localStorage.setItem('favoriteRecipes', stringifyFavorite);
  }

  function handleFavorite(index, id) {
    return (
      <input
        type="image"
        src={ blackHeartIcon }
        alt=""
        data-testid={ `${index}-horizontal-favorite-btn` }
        onClick={ () => handleRemoveFavorite(id) }
      />
    );
  }

  function handleTagOrAlcohol(category, index) {
    return (
      <p
        key={ index }
        className="textClass"
        data-testid={ `${index}-horizontal-top-text` }
      >
        {category.alcoholicOrNot}
      </p>
    );
  }

  function copyUrl({ type, id }) {
    setCopyLoading(true);
    setTimeout(() => setCopyLoading(false), treeSeconds);
    return copy(`http://localhost:3000/${type}s/${id}`);
  }

  function handleCards() {
    return favoriteRecipes.map((done, index) => (
      <div key={ index } className="card">
        <input
          type="image"
          className="imgCard"
          src={ done.image }
          alt=""
          data-testid={ `${index}-horizontal-image` }
          onClick={ () => history.push(`/${done.type}s/${done.id}`) }
        />
        <h1
          data-testid={ `${index}-horizontal-top-text` }
          className="textClass"
        >
          { done.type.includes('comida') && `${done.area} - ${done.category}`}
        </h1>
        <Link
          data-testid={ `${index}-horizontal-name` }
          className="textClass"
          to={ `${done.type}s/${done.id}` }
        >
          {done.name}
        </Link>
        { done.type.includes('bebida') && handleTagOrAlcohol(done, index)}
        <input
          type="image"
          src={ shareIcon }
          data-testid={ `${index}-horizontal-share-btn` }
          alt=""
          onClick={ () => copyUrl(done) }
        />
        { copyLoading && <p>Link copiado!</p> }
        { handleFavorite(index, done.id) }
      </div>
    ));
  }

  return (
    !favoriteRecipes ? 'Sem receitas favoritas' : (
      <div>
        <div>
          <Header />
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ () => setFavoriteRecipes(noFilterFavoriteRecipes) }
          >
            ALL
          </button>
          <button
            type="button"
            data-testid="filter-by-food-btn"
            value="comida"
            onClick={ ({ target }) => handleClickFilter(target.value) }
          >
            Food
          </button>
          <button
            type="button"
            value="bebida"
            data-testid="filter-by-drink-btn"
            onClick={ ({ target }) => handleClickFilter(target.value) }
          >
            Drinks
          </button>
        </div>
        <div className="divCard">
          {loading ? 'loading...' : handleCards()}
        </div>
      </div>
    )
  );
}
