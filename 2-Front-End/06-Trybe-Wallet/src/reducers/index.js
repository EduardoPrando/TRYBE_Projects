// Configure os seus reducers.
import { combineReducers } from 'redux';
// import user from './user';
import userReducer from './user';
import addExpensesReducer from './wallet';

const rootReducer = combineReducers({
  // ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global
  user: userReducer,
  // import wallet from './wallet';
  wallet: addExpensesReducer,
});

export default rootReducer;
