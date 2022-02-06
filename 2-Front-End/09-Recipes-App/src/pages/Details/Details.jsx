import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import MealsDetails from './MealsDetails';
import DrinksDetails from './DrinksDetails';
import DetailsProvider from '../../context/DetailsProvider';
import contextCreate from '../../context/contextCreate';
import './details.css';

export default function Details() {
  const { loading } = useContext(contextCreate);
  const history = useHistory();
  const { pathname } = history.location;
  const [foodOrDrink] = pathname.split('/').slice(1);

  if (loading) {
    return (<p>Carregando</p>);
  }

  switch (foodOrDrink) {
  case 'comidas':
    return (
      <DetailsProvider>
        <MealsDetails />
      </DetailsProvider>
    );
  case 'bebidas':
    return (
      <DetailsProvider>
        <DrinksDetails />
      </DetailsProvider>
    );
  default:
    return (<p>Página Invalida</p>);
  }
}

Details.propTypes = {
  match: PropTypes.object,
}.isRequired;
