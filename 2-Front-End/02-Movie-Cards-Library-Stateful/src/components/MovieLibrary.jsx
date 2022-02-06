import React, { Component } from 'react';

import PropTypes from 'prop-types';
import MovieList from './MovieList';
import SearchBar from './SearchBar';
import AddMovie from './AddMovie';

export default class MovieLibrary extends Component {
  constructor(props) {
    super(props);
    this.onBookmarkedChange = this.onBookmarkedChange.bind(this);
    this.onSearchTextChange = this.onSearchTextChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.state = {
      searchText: '',
      bookmarkedOnly: false,
      selectedGenre: '',
      movies: props.movies,
    };
  }

  onBookmarkedChange() {
    const { movies } = this.props;
    const { bookmarkedOnly } = this.state;
    const filterMovies = movies.filter((movie) => movie.bookmarked === true);
    if (bookmarkedOnly === false) {
      return this.setState({
        bookmarkedOnly: true,
        movies: filterMovies,
      });
    } this.setState({
      bookmarkedOnly: false,
      movies,
    });
  }

  onSearchTextChange({ target }) {
    const { movies } = this.props;
    const { value } = target;
    const filterSearchMovies = movies.filter((movie) => movie.title.includes(value)
      || movie.subtitle.includes(value)
      || movie.storyline.includes(value));
    this.setState({
      searchText: value,
      movies: filterSearchMovies,
    });
  }

  onSelectedGenreChange = ({ target }) => {
    const { movies } = this.props;
    const { value } = target;
    if (value === '') {
      return this.setState({
        selectedGenre: '',
        movies,
      });
    }
    const filterGenreMovies = movies.filter((movie) => movie.genre === value);
    this.setState({
      selectedGenre: value,
      movies: filterGenreMovies,
    });
  }

  onClick(back) {
    const { movies } = this.state;
    this.setState({
      movies: [...movies, back],
    });
  }

  render() {
    const { movies, searchText, bookmarkedOnly, selectedGenre } = this.state;
    return (
      <div>
        <h2> My awesome movie library </h2>
        <SearchBar
          searchText={ searchText }
          bookmarkedOnly={ bookmarkedOnly }
          selectedGenre={ selectedGenre }
          onBookmarkedChange={ this.onBookmarkedChange }
          onSearchTextChange={ this.onSearchTextChange }
          onSelectedGenreChange={ this.onSelectedGenreChange }
        />
        <MovieList movies={ movies } />
        <AddMovie onClick={ this.onClick } />
      </div>
    );
  }
}

MovieLibrary.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.string).isRequired,
};
