import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import shareIcon from '../../images/shareIcon.svg';
import './recipesDone.css';

const treeSeconds = 3000;

const copy = require('clipboard-copy');

export default function RecipesDone() {
  const history = useHistory();
  const [doneRecipes, setDoneRecipes] = useState();
  const [noFilterDoneRecipes, setNoFilterDoneRecipes] = useState();
  const [loading, setLoading] = useState(true);
  const [copyLoading, setCopyLoading] = useState(false);

  useEffect(() => {
    function getLocalStorage() {
      const getItem = JSON.parse(localStorage.getItem('doneRecipes'));
      setDoneRecipes(getItem);
      setNoFilterDoneRecipes(getItem);
    }
    getLocalStorage();
    setLoading(false);
  }, []);

  function handleClickFilter(typeFilter) {
    const recipeFilter = noFilterDoneRecipes
      .filter((recipe) => recipe.type.includes(typeFilter));
    setDoneRecipes(recipeFilter);
    setLoading(false);
  }

  function handleTagOrAlcohol(category, index) {
    if (category.type.includes('comida')) {
      return category.tags.map((tag, i) => (
        <p
          key={ i }
          className="textClass"
          data-testid={ `${index}-${tag}-horizontal-tag` }
        >
          {tag}
        </p>
      ));
    } return (
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
    return doneRecipes.map((done, index) => (
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
        {done.doneDate && (
          <h5
            data-testid={ `${index}-horizontal-done-date` }
            className="textClass"
          >
            {done.doneDate}
          </h5>
        )}

        <h4>
          { handleTagOrAlcohol(done, index)}
        </h4>
        <input
          type="image"
          src={ shareIcon }
          data-testid={ `${index}-horizontal-share-btn` }
          alt=""
          onClick={ () => copyUrl(done) }
        />
        { copyLoading && <p>Link copiado!</p> }
      </div>
    ));
  }

  return (
    !doneRecipes ? 'Sem receitas prontas' : (
      <div>
        <div>
          <Header />
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ () => setDoneRecipes(noFilterDoneRecipes) }
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
