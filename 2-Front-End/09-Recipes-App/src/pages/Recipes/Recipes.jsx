import React from 'react';
// import CardIngredients from '../components/CardIngredients';
import { getPageArgs } from '../services/Service';

export default function Recipes(props) {
  // this url must be: /comida.. or /bebida.. followed by '/id' and '/inProgress
  // getPageArgs separe these sessions in a args array
  // args = ['comidas', '123', 'inProgress']
  const args = getPageArgs(props);
  const [page, id] = args;
  console.log(page, id);

  const category = 'teste';
  // const ingredientesCheckbox = 'teste';
  const instructions = 'teste';

  // function showCompleted(e) {}

  return (
    <div>
      <img data-testid="recipe-photo" src="" alt="Foto da Receita" />
      <h2 data-testid="recipe-title">Receitas</h2>
      <h3 data-testid="recipe-category">{category}</h3>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      {/* { CardIngredients() } */}
      {/* <CardIngredients ingredients={ ingredients(recipeData) } /> */}
      <p data-testid="instructions">{instructions}</p>
      <button type="button" data-testid="finish-recipe-btn">Finalizar</button>
    </div>
  );
}
