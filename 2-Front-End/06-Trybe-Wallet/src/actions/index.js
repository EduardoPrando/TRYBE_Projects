// Coloque aqui suas actions
export const USER_ACTIONS = {
  USER_NAME: 'USER_NAME',
  USER_EXPENSES: 'USER_EXPENSES',
  EXCHANGE_THUNK: 'EXCHANGE_THUNK',
  FETCH_ERROR: 'FETCH_ERROR',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  USER_EDIT_EXPENSES: 'USER_EDIT_EXPENSES',
  USER_DELETE_EXPENSES: 'USER_DELETE_EXPENSES',
};

export const userInformation = (payload) => ({
  type: USER_ACTIONS.USER_NAME,
  payload,
});

export const addExpense = (payload) => ({
  type: USER_ACTIONS.USER_EXPENSES,
  payload,
});

export const deleteExpense = (payload) => ({
  type: USER_ACTIONS.USER_DELETE_EXPENSES,
  payload,
});

export const editExpense = (payload) => ({
  type: USER_ACTIONS.USER_EDIT_EXPENSES,
  payload,
});

export const exchangeThunk = (payload) => ({
  type: USER_ACTIONS.EXCHANGE_THUNK,
  payload,
});

export const fetchThunkError = (payload) => ({
  type: USER_ACTIONS.FETCH_ERROR,
  payload,
});

export const fetchThunkSuccess = (payload) => ({
  type: USER_ACTIONS.FETCH_SUCCESS,
  payload,
});

export const coinsFetchThunk = () => async (dispatch) => {
  const linkApi = 'https://economia.awesomeapi.com.br/json/all';
  try {
    const payload = await (await fetch(linkApi)).json();
    dispatch(fetchThunkSuccess(payload));
  } catch (error) {
    dispatch(fetchThunkError(error));
  }
};

export const exchangeFetchThunk = (payload) => async (dispatch) => {
  const linkApi = 'https://economia.awesomeapi.com.br/json/all';
  const response = await (await fetch(linkApi)).json();
  payload.exchangeRates = { ...response };
  dispatch(addExpense(payload));
};
