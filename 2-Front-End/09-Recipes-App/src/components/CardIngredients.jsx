import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
// import { loadProgressRecipeById, getPageArgs } from '../services/Service';
import { getPageArgs } from '../services/Service';

export default function CardIngredients({ ingredients }) {
  const history = useHistory();
  const args = getPageArgs(history);
  // const [page, id, inProgress] = args;
  const [inProgress] = args.slice(2);

  function toggleCheckbox(e) {
    const change = e.target;
    if (change.checked === true) {
      change.setAttribute('style', 'text-decoration: line-through');
    } else {
      change.setAttribute('style', '');
    }
  }

  function loadIfProgressPage() {
    // const verifyIngs = loadProgressRecipeById(id);
    return (
      <div>
        <div>Ingredients InProgress list</div>
        <ul>
          {ingredients.map((ingre, ingreIndex) => (
            Object.entries(ingre).map((entrie) => {
              if (entrie[1] === '') {
                return (
                  <li data-testid={ `${ingreIndex}-ingredient-step` }>
                    <input
                      type="checkbox"
                      id={ `${ingreIndex}checkIng` }
                      onChange={ toggleCheckbox }
                    />
                    <label
                      htmlFor={ `${ingreIndex}checkIng` }
                    >
                      {entrie[0]}
                    </label>
                  </li>
                );
              }
              return (
                <li
                  data-testid={ `${ingreIndex}-ingredient-step` }
                  key={ entrie[0] }
                >
                  <input
                    type="checkbox"
                    id={ `${ingreIndex}checkIng` }
                    onChange={ (e) => toggleCheckbox(e) }
                  />
                  <label
                    htmlFor={ `${ingreIndex}checkIng` }
                  >
                    {`${entrie[1]} - ${entrie[0]}`}
                  </label>
                </li>
              );
            })
          ))}
        </ul>
      </div>
    );
  }

  function loadOnRecipePage() {
    return (
      <ul>
        {ingredients.map((ingre, ingreIndex) => (
          Object.entries(ingre).map((entrie) => {
            if (entrie[1] === '') {
              return (
                <li data-testid={ `${ingreIndex}-ingredient-name-and-measure` }>
                  {entrie[0]}
                </li>
              );
            }
            return (
              <li
                data-testid={ `${ingreIndex}-ingredient-name-and-measure` }
                key={ entrie[0] }
              >
                {`${entrie[1]} - ${entrie[0]}`}
              </li>
            );
          })
        ))}
      </ul>
    );
  }

  return (
    <div>
      { inProgress ? loadIfProgressPage() : loadOnRecipePage() }
    </div>
  );
}

CardIngredients.propTypes = {
  ingredients: PropTypes.object,
}.isRequired;
