import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class LabelTextArea extends Component {
  render() {
    const { stateProp, change } = this.props;
    return (
      <label htmlFor="storyline" data-testid="storyline-input-label">
        Sinopse
        <textarea
          value={ stateProp }
          name="storyline"
          cols="30"
          rows="10"
          data-testid="storyline-input"
          onChange={ change }
        />
      </label>
    );
  }
}

LabelTextArea.propTypes = {
  stateProp: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
};
