// import React from "react";

const OUT_ARRAY_LENGTH = 3;
const KEY_STORAGEPROGRESS = 'inProgressRecipes';

export function getPageArgs(object) {
  const { location: { pathname } } = object;
  const args = pathname.slice(1).trim().split('/', OUT_ARRAY_LENGTH);
  return args;
}

function translateType(str) {
  if (str === 'comidas') return 'meals';
  return 'cocktails';
}

export function loadProgressRecipes() {
  let stored = JSON.parse(localStorage.getItem(KEY_STORAGEPROGRESS));
  if (!stored) {
    stored = {
      cocktails: {},
      meals: {},
    };
  }
  return stored;
}

export function loadProgressRecipeById(type, id) {
  const stored = loadProgressRecipes();
  const recipeType = translateType(type);
  if (!stored[recipeType][id]) {
    return [];
  }
  return stored[recipeType][id];
}

export function saveProgress(type, id, list) {
  const recipeType = translateType(type);
  const stored = loadProgressRecipes();
  if (list.length === 0) {
    delete stored[recipeType][id];
  }

  // a lógica aqui é substituir a lista e ingredientes obtitos para concluir a receita
  stored[recipeType][id] = list; // <-- forma simplificada para fazer a alteração

  /* stored = { // dessa forma tenha atenção ao usar o spred operator antes da alteração à vir
    ...stored,
    [recipeType]: {
      ...stored[recipeType],
      [id]: list,
    },
  }; */
  localStorage.setItem(KEY_STORAGEPROGRESS, JSON.stringify(stored));
}
