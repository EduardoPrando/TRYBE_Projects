const URL_FOODS = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const URL_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const RECOMMENDED_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const RECOMMENDED_FOOD = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

export async function fetchFoodById(id) {
  const { meals } = await (await fetch(`${URL_FOODS}${id}`))
    .json();
  return meals[0];
}

export async function fetchDrinkById(id) {
  const { drinks } = await (await fetch(`${URL_DRINKS}${id}`))
    .json();
  return drinks[0];
}

export async function fetchRecommendedFood() {
  const { meals } = await (await fetch(`${RECOMMENDED_FOOD}`))
    .json();
  return meals;
}

export async function fetchRecommendedDrink() {
  const { drinks } = await (await fetch(`${RECOMMENDED_DRINKS}`))
    .json();
  return drinks;
}
