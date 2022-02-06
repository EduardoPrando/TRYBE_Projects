import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class LabelSelect extends Component {
  render() {
    const { selectedGenre, onSelectedGenreChange } = this.props;
    return (
      <label htmlFor="genre" data-testid="select-input-label">
        Filtrar por gênero
        <select
          name="genre"
          value={ selectedGenre }
          onChange={ onSelectedGenreChange }
          data-testid="select-input"
        >
          <option value="" data-testid="select-input">Todos</option>
          <option value="action" data-testid="select-input">Ação</option>
          <option value="comedy" data-testid="select-input">Comédia</option>
          <option value="thriller" data-testid="select-input">Suspense</option>
        </select>
      </label>

    );
  }
}

LabelSelect.propTypes = {
  selectedGenre: PropTypes.string.isRequired,
  onSelectedGenreChange: PropTypes.func.isRequired,
};
