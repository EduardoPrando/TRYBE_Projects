import React, { useContext, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';
import contextCreate from '../context/contextCreate';

export default function Header() {
  const { setToggleSearch } = useContext(contextCreate);
  const [showFilters, setShowFilters] = useState(false);
  const { pathname } = useLocation(); // Component em uma Pagina busca histórico
  const history = useHistory();

  function renderFilters() {
    return (
      <SearchBar />
    );
  }

  function renderInMain(title) {
    return (
      <div className="header2">
        <input
          type="image"
          alt="profile"
          data-testid="profile-top-btn"
          onClick={ () => history.push('/perfil') }
          src={ profileIcon }
        />
        <h1 data-testid="page-title">{ title }</h1>
        { (title === 'Comidas' || title === 'Bebidas' || title === 'Explorar Origem')
          ? (
            <input
              type="image"
              alt="searchIcon"
              data-testid="search-top-btn"
              onClick={ () => {
                setShowFilters(!showFilters);
                setToggleSearch(true);
              } }
              src={ searchIcon }
            />)
          : <div /> }
      </div>
    );
  }

  function handleOnLoad() {
    switch (pathname) {
    case '/comidas':
      return renderInMain('Comidas');
    case '/bebidas':
      return renderInMain('Bebidas');
    case '/explorar':
      return renderInMain('Explorar');
    case '/explorar/comidas':
      return renderInMain('Explorar Comidas');
    case '/explorar/bebidas':
      return renderInMain('Explorar Bebidas');
    case '/explorar/comidas/ingredientes':
      return renderInMain('Explorar Ingredientes');
    case '/explorar/bebidas/ingredientes':
      return renderInMain('Explorar Ingredientes');
    case '/explorar/comidas/area':
      return renderInMain('Explorar Origem');
    case '/receitas-feitas':
      return renderInMain('Receitas Feitas');
    case '/receitas-favoritas':
      return renderInMain('Receitas Favoritas');
    case '/perfil':
      return renderInMain('Perfil');
    default:
      return <div>Header Not Found</div>;
    }
  }

  return (
    <div className="header">
      {handleOnLoad()}
      {showFilters ? (renderFilters()) : (<div />)}
    </div>
  );
}
