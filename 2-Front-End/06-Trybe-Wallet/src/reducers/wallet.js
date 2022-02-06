// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { USER_ACTIONS } from '../actions';
// import thunk from 'redux-thunk';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const addExpensesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_ACTIONS.USER_EXPENSES:
    return { ...state, expenses: [...state.expenses, action.payload] };
  case USER_ACTIONS.USER_DELETE_EXPENSES:
    return { ...state, expenses: [...action.payload] };
  case USER_ACTIONS.USER_EDIT_EXPENSES:
    return { ...state, expenses: [...action.payload] };
  case USER_ACTIONS.FETCH_SUCCESS:
    return { ...state, currencies: action.payload };
  case USER_ACTIONS.FETCH_ERROR:
    return { ...state, error: action.payload.error };
  default:
    return state;
  }
};

export default addExpensesReducer;
