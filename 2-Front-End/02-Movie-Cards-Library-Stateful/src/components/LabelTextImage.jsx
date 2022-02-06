import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class LabelTextImage extends Component {
  render() {
    const { stateProp, change } = this.props;
    return (
      <label htmlFor="imagePath" data-testid="image-input-label">
        Imagem
        <input
          value={ stateProp }
          type="text"
          name="imagePath"
          data-testid="image-input"
          onChange={ change }
        />
      </label>
    );
  }
}

LabelTextImage.propTypes = {
  stateProp: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
};
