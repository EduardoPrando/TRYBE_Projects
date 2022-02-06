import React, { useContext } from 'react';
import contextCreate from '../../context/contextCreate';
import ShareBtn from '../../components/ShareBtn';
import TitleDetails from '../../components/TitleDetails';
import CardIngredients from '../../components/CardIngredients';
import ingredients from '../../services/ingredients';
import CardRecipeItens from '../../components/CardRecipeItens';
import StartRecipeBtn from '../../components/StartRecipeBtn';
import FavoriteBtn from '../../components/FavoriteBtn';

export default function DrinksDetails() {
  const { recipeData } = useContext(contextCreate);
  return (
    <div>
      <TitleDetails recipeData={ recipeData } />
      <div className="share-favorite-btn">
        <ShareBtn />
        <FavoriteBtn />
      </div>
      <CardIngredients ingredients={ ingredients(recipeData) } />
      <div>
        <h4>Instruções</h4>
        <p data-testid="instructions">{ recipeData.strInstructions }</p>
      </div>
      <div>
        <h4>
          Recomendadas
        </h4>
        <CardRecipeItens limit={ 6 } />
      </div>
      <StartRecipeBtn />
    </div>
  );
}
