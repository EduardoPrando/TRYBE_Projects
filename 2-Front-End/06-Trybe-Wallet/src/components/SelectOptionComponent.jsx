import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

export default class SelectOptionComponent extends Component {
  render() {
    const { name, value, textCoin, onChange, mapValue } = this.props;
    return (
      <label htmlFor={ name }>
        { textCoin }
        <select name={ name } id={ name } value={ value } onChange={ onChange }>
          { mapValue.map((selected) => (
            <option key={ selected }>
              { selected }
            </option>
          )) }
        </select>
      </label>
    );
  }
}

SelectOptionComponent.propTypes = ({
  name: PropTypes.string,
  value: PropTypes.string,
  textCoin: PropTypes.string,
  onChange: PropTypes.func,
  mapValue: PropTypes.arrayOf(PropTypes.string),
}.isRequired);
