import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Explore() {
  const { pathname } = useLocation();
  console.log(pathname);
  function rota1() {
    return (
      <div className="rota">

        <div>
          <Link to="/explorar/comidas/ingredientes">
            <Button
              className="buttonExplore"
              size="lg"
              variant="outline-success"
              type="button"
              data-testid="explore-by-ingredient"
            >
              <strong>  Por Ingredientes </strong>
            </Button>
          </Link>
        </div>
        <div>
          <Link to="/explorar/comidas/area">
            <Button
              className="buttonExplore"
              size="lg"
              variant="outline-success"
              type="button"
              data-testid="explore-by-area"
            >
              <strong> Por Local de Origem </strong>
            </Button>
          </Link>
        </div>
        <div>
          <Link to="/comidas/52771">
            <Button
              size="lg"
              variant="outline-success"
              type="button"
              data-testid="explore-surprise"
            >
              <strong> Me Surpreenda!</strong>
            </Button>
          </Link>
        </div>

      </div>
    );
  }

  function rota2() {
    return (
      <div className="rota">

        <div>
          <Link to="/explorar/bebidas/ingredientes">
            <Button
              className="buttonExplore"
              size="lg"
              variant="outline-primary"
              type="button"
              data-testid="explore-by-ingredient"
            >
              <strong> Por Ingredientes</strong>
            </Button>
          </Link>
        </div>
        <div>
          <Link to="/bebidas/178319">
            <Button
              size="lg"
              variant="outline-primary"
              type="button"
              data-testid="explore-surprise"
            >
              <strong>  Me Surpreenda!</strong>
            </Button>
          </Link>
        </div>

      </div>
    );
  }
  function handleRoute() {
    switch (pathname) {
    case '/explorar/comidas':
      return rota1();
    case '/explorar/bebidas':
      return rota2();
    default:
      return <div>Aproveitem!!!</div>;
    }
  }
  return (
    <div>
      <Header />
      <div className="explore">
        <div>
          <Link to="/explorar/comidas">
            <Button
              size="lg"
              variant="outline-info"
              className="buttonExplore"
              type="button"
              data-testid="explore-food"
            >
              Explorar Comidas
            </Button>
          </Link>
        </div>
        <div>
          <Link to="/explorar/bebidas">
            <Button
              size="lg"
              variant="outline-info"
              type="button"
              data-testid="explore-drinks"
            >
              Explorar Bebidas
            </Button>
          </Link>
        </div>
      </div>
      {handleRoute()}
      <Footer />
    </div>
  );
}
