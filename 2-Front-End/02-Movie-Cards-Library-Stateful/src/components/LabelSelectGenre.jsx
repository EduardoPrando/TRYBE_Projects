import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class LabelSelectGenre extends Component {
  render() {
    const { stateProp, change } = this.props;
    return (
      <label htmlFor="genre" data-testid="genre-input-label">
        Gênero
        <select
          name="genre"
          value={ stateProp }
          onChange={ change }
          data-testid="genre-input"
        >
          <option value="action" data-testid="genre-option">Ação</option>
          <option value="comedy" data-testid="genre-option">Comédia</option>
          <option value="thriller" data-testid="genre-option">Suspense</option>
        </select>
      </label>
    );
  }
}

LabelSelectGenre.propTypes = {
  stateProp: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
};
