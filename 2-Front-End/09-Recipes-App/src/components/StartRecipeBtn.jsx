import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import contextCreate from '../context/contextCreate';

export default function StartRecipeBtn() {
  const { receitaId } = useContext(contextCreate);

  const history = useHistory();
  const { pathname } = history.location;

  function startBtn() {
    return (
      <button
        className="start-recipe-btn"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ (event) => {
          event.preventDefault();
          history.push(`${pathname}/in-progress`);
        } }
      >
        Iniciar receita
      </button>
    );
  }

  function renderSomeBtn() {
    if (localStorage.getItem('inProgressRecipes')) {
      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const findedInProgress = Object.values(inProgressRecipes)
        .map((type) => Object.keys(type).find((keys) => keys === receitaId));

      if (findedInProgress.includes(receitaId)) {
        return (
          <button
            className="start-recipe-btn"
            type="button"
            data-testid="start-recipe-btn"
          >
            Continuar Receita
          </button>
        );
      }
    }
    return startBtn();
  }

  if (localStorage.getItem('doneRecipes')) {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const findedDone = doneRecipes.find((recipe) => recipe.id === receitaId);
    return findedDone ? '' : renderSomeBtn();
  }
  return renderSomeBtn();
}
