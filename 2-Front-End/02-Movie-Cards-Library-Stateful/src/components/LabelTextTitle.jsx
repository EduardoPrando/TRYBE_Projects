import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class LabelTextTitle extends Component {
  render() {
    const { stateProp, change } = this.props;
    return (
      <label htmlFor="title" data-testid="title-input-label">
        Título
        <input
          value={ stateProp }
          type="text"
          name="title"
          data-testid="title-input"
          onChange={ change }
        />
      </label>
    );
  }
}

LabelTextTitle.propTypes = {
  stateProp: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
};
