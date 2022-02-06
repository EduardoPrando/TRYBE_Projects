import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Details from './pages/Details';
import Explore from './pages/Explore';
import ExploreIngre from './pages/ExploreIngre';
import Main from './pages/Main';
import Profile from './pages/Profile';
import Recipes from './pages/Recipes';
import Loading from './components/Loading';
import ContextProvider from './context/ContextProvider';
import RecipesDone from './pages/RecipesDone';
import RecipesFavorite from './pages/RecipesFavorite';

function App() {
  return (
    <ContextProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Main } />
        <Route exact path="/bebidas" component={ Main } />
        <Route path="/comidas/:receitaId" component={ Details } />
        <Route path="/bebidas/:receitaId" component={ Details } />
        <Route path="/comidas/:receitaId/in-progress" component={ Recipes } />
        <Route path="/bebidas/:receitaId/in-progress" component={ Recipes } />
        <Route exact path="/receitas-feitas" component={ RecipesDone } />
        <Route exact path="/receitas-favoritas" component={ RecipesFavorite } />
        <Route exact path="/explorar" component={ Explore } />
        <Route exact path="/explorar/comidas" component={ Explore } />
        <Route exact path="/explorar/bebidas" component={ Explore } />
        <Route exact path="/explorar/comidas/ingredientes" component={ ExploreIngre } />
        <Route exact path="/explorar/bebidas/ingredientes" component={ ExploreIngre } />
        <Route exact path="/explorar/comidas/area" component={ Explore } />
        <Route path="/perfil" component={ Profile } />
        <Route component={ Loading } />
      </Switch>
    </ContextProvider>

  );
}

export default App;
