import React, { useContext, useState } from 'react';
import ContextCreat from '../../context/ContextCreat';
import './Index.css';
import starWarsLogo from '../../img/star-wars-logo-5.png';

function Header() {
  const {
    handleName,
    columnsFilter,
    filters,
    removeFilter,
    sortFunction,
  } = useContext(ContextCreat);
  const { optionValue } = filters;

  const [filterColumn, setFilterColumn] = useState('population');
  const [filterComparison, setFilterComparison] = useState('maior que');
  const [filterValue, setFilterValue] = useState(0);
  const [sortColumn, setSortColumn] = useState('name');
  const [sortValue, setSortValue] = useState('');

  function optionSelectValue(value) {
    return value.map((option, index) => (
      <option key={ index } value={ option }>{ option }</option>
    ));
  }

  const headerTable = [
    'name',
    'created',
    'edited',
    'films',
    'rotation_period',
    'orbital_period',
    'diameter',
    'climate',
    'gravity',
    'terrain',
    'surfaceWater',
    'population',
    'url',
  ];

  const newFilter = {
    column: filterColumn,
    comparison: filterComparison,
    value: filterValue,
  };

  return (
    <header className="headerClass">
      <img src={ starWarsLogo } alt="Star Wars Logo" className="logoStarWars" />
      <p>Planets Filter</p>
      <div className="filtersBox">
        <label
          className="filters"
          htmlFor="name"
        >
          <input
            data-testid="name-filter"
            placeholder="Text Value Filter"
            type="text"
            name="name"
            id="name"
            onChange={ ({ target }) => handleName(target.value) }
          />
        </label>

        <label
          className="filters"
          htmlFor="filterNumeric"
        >
          <select
            data-testid="column-filter"
            name="filterNumeric"
            id="filterNumeric"
            onChange={ ({ target }) => setFilterColumn(target.value) }
          >
            { optionSelectValue(optionValue) }
          </select>
        </label>

        <label
          className="filters"
          htmlFor="filterBiggerSmallerEqual"
        >
          <select
            name="filterBiggerSmallerEqual"
            id="filterBiggerSmallerEqual"
            data-testid="comparison-filter"
            onChange={ ({ target }) => setFilterComparison(target.value) }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>

        <label
          className="filters"
          htmlFor="valueFilter"
        >
          <input
            type="number"
            id="valueFilter"
            placeholder="Numeric Value Filter"
            data-testid="value-filter"
            onChange={ ({ target }) => setFilterValue(target.value) }
          />
        </label>

        <button
          className="buttons"
          type="button"
          data-testid="button-filter"
          onClick={ () => { columnsFilter(newFilter); } }
        >
          Filter
        </button>
        {filters.filterByNumericValues.map(({ column, comparison, value }) => {
          if (column === '') return null;
          return (
            <div key={ column } data-testid="filter">
              <p>{column}</p>
              <p>{comparison}</p>
              <p>{value}</p>
              <button type="button" onClick={ () => { removeFilter(column); } }>X</button>
            </div>
          );
        })}
      </div>
      <div className="sortedDiv">
        <label
          className="sortBox"
          htmlFor="sortFilter"
        >
          <select
            name="sortFilter"
            id="sortFilter"
            data-testid="column-sort"
            onChange={ ({ target }) => setSortColumn(target.value) }
          >
            { optionSelectValue(headerTable) }
          </select>
        </label>
        <div className="sortBox">
          <label htmlFor="ASC">
            Asc
            <input
              type="radio"
              name="sortRadio"
              id="ASC"
              value="ASC"
              data-testid="column-sort-input-asc"
              onChange={ ({ target }) => setSortValue(target.value) }
            />
          </label>

          <label htmlFor="DESC">
            Desc
            <input
              type="radio"
              name="sortRadio"
              id="DESC"
              value="DESC"
              data-testid="column-sort-input-desc"
              onChange={ ({ target }) => setSortValue(target.value) }
            />
          </label>
        </div>
        <button
          className="buttons"
          type="button"
          data-testid="column-sort-button"
          onClick={ () => sortFunction(sortColumn, sortValue) }
        >
          SortBy
        </button>
      </div>
    </header>
  );
}

export default Header;
