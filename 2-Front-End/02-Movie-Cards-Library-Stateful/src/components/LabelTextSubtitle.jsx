import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class LabelTextSubtitle extends Component {
  render() {
    const { stateProp, change } = this.props;
    return (
      <label htmlFor="subtitle" data-testid="subtitle-input-label">
        Subtítulo
        <input
          value={ stateProp }
          type="text"
          name="subtitle"
          data-testid="subtitle-input"
          onChange={ change }
        />
      </label>
    );
  }
}

LabelTextSubtitle.propTypes = {
  stateProp: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
};
