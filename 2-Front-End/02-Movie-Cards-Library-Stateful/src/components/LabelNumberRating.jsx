import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class LabelNumberRating extends Component {
  render() {
    const { stateProp, change } = this.props;
    return (
      <label htmlFor="rating" data-testid="rating-input-label">
        Avaliação
        <input
          value={ stateProp }
          type="number"
          name="rating"
          data-testid="rating-input"
          onChange={ change }
        />
      </label>
    );
  }
}

LabelNumberRating.propTypes = {
  stateProp: PropTypes.number.isRequired,
  change: PropTypes.func.isRequired,
};
