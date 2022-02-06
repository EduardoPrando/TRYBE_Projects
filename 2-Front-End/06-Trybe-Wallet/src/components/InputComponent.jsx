import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class InputComponent extends Component {
  render() {
    const { label, type, name, datatestid, value, onChange } = this.props;
    return (
      <label htmlFor={ name }>
        { label }
        <input
          type={ type }
          name={ name }
          id={ name }
          data-testid={ datatestid }
          value={ value }
          onChange={ onChange }
        />
      </label>
    );
  }
}

InputComponent.propTypes = ({
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
}.isRequired);

InputComponent.defaultProps = {
  datatestid: '',
};
