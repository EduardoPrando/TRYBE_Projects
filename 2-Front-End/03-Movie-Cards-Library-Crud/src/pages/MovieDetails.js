import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as movieAPI from '../services/movieAPI';
import { Loading } from '../components';

export default class MovieDetails extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      id: 0,
      imagePath: '',
      title: '',
      subtitle: '',
      storyline: '',
      genre: '',
      rating: 0,
    };
  }

  componentDidMount() {
    this.getMovie();
  }

  getMovie = async () => {
    const { match: { params } } = this.props;
    const data = await movieAPI.getMovie(params.id);
    const { title, storyline, imagePath, genre, rating, subtitle, id } = data;
    this.setState({
      title,
      storyline,
      imagePath,
      genre,
      rating,
      subtitle,
      id,
      loading: false,
    });
  }

  handleClick = (movieId) => {
    movieAPI.deleteMovie(movieId);
  }

  render() {
    const { title,
      storyline,
      imagePath,
      genre,
      rating,
      subtitle,
      id,
      loading } = this.state;

    return (
      <div data-testid="movie-details">
        { loading ? <Loading /> : (
          <>
            <img alt="Movie Cover" src={ `../${imagePath}` } />
            <p>{ `Title: ${title}` }</p>
            <p>{ `Subtitle: ${subtitle}` }</p>
            <p>{ `Storyline: ${storyline}` }</p>
            <p>{ `Genre: ${genre}` }</p>
            <p>{ `Rating: ${rating}` }</p>
          </>) }
        <div>
          <Link to="/">
            VOLTAR
          </Link>
          <Link to={ `/movies/${id}/edit` }>
            EDITAR
          </Link>
          <Link to="/" onClick={ () => this.handleClick(id) }>
            DELETAR
          </Link>
        </div>
      </div>
    );
  }
}

MovieDetails.propTypes = ({
  props: PropTypes.objectOf(PropTypes.string),
}).isRequired;
