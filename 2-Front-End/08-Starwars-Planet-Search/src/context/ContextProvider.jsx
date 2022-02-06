import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ContextCreat from './ContextCreat';

const PLANETS_URL = 'https://swapi-trybe.herokuapp.com/api/planets/';

const optionNoFilter = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

const optionFullSize = 4;
const one = 1;

export default function ContextProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filterName, setFilterByName] = useState([]);
  const [optionFilter, setOptionFilter] = useState(optionNoFilter);
  const [orderSort, setOrderSort] = useState({
    order: {
      column: 'name',
      sort: 'ASC',
    } });

  function sortForNumber(value, column, sort) {
    console.log(value, column);
    switch (sort) {
    case 'ASC':
      return value.sort((a, b) => Number(a[column]) - Number(b[column]));
    case 'DESC':
      return value.sort((a, b) => Number(b[column]) - Number(a[column]));
    default:
      return null;
    }
  }

  function sortForWords(value, column, sort) {
    switch (sort) {
    case 'ASC':
      return value.sort((a, b) => {
        if (a[column] < b[column]) return -one;
        if (a[column] > b[column]) return one;
        return 0;
      });
    case 'DESC':
      return value.sort((a, b) => {
        if (a[column] > b[column]) return -one;
        if (a[column] < b[column]) return one;
        return 0;
      });
    default:
      return null;
    }
  }

  const numberSort = [
    'rotation_period',
    'orbital_period',
    'diameter',
    'gravity',
    'surfaceWater',
    'population',
  ];

  useEffect(() => {
    async function fetchApi() {
      const { results } = await (await fetch(PLANETS_URL)).json();
      const sortedResult = results.sort((a, b) => {
        if (a.name < b.name) return -one;
        if (a.name > b.name) return one;
        return 0;
      });
      setPlanets(sortedResult);
      setFilterByName(sortedResult);
    }
    fetchApi();
  }, []);

  const [filterItems, setFilterItems] = useState({
    filterByNumericValues: [
      {
        column: '',
        comparison: '',
        value: '',
      },
    ],
  });

  const filters = {
    filterByName: {
      name: filterName,
    },
    optionValue: optionFilter,
    ...filterItems,
    ...orderSort,
  };

  function includeFilterItems({ comparison, column, value }) {
    setFilterItems((old) => ({
      filterByNumericValues: [
        ...old.filterByNumericValues,
        {
          column,
          comparison,
          value,
        },
      ],
    }));
  }

  function sortFunction(column, sort) {
    setOrderSort({ order: { column, sort } });
    const isNumber = numberSort.includes(column);
    if (!isNumber) {
      return sortForWords(filterName, column, sort);
    } return sortForNumber(filterName, column, sort);
  }

  function removeOption(column) {
    const { optionValue } = filters;
    const newOption = optionValue.filter((option) => option !== column);
    setOptionFilter(newOption);
  }

  function columnsFilter(newFilter) {
    includeFilterItems(newFilter);
    const { comparison, column, value } = newFilter;
    removeOption(column);
    switch (comparison) {
    case 'maior que':
      return setFilterByName(planets
        .filter((planet) => Number(planet[column]) > Number(value)));
    case 'menor que':
      return setFilterByName(planets
        .filter((planet) => Number(planet[column]) < Number(value)));
    case 'igual a':
      return setFilterByName(planets
        .filter((planet) => Number(planet[column]) === Number(value)));
    default: setFilterByName(planets);
    }
  }

  function removeFilter(column) {
    const { optionValue } = filters;
    const lo = filters.filterByNumericValues.filter((filter) => filter.column !== column);
    setFilterItems({
      filterByNumericValues: [
        ...lo,
      ],
    });
    setOptionFilter((old) => [...old, column]);
    if (optionValue.length === optionFullSize) return setFilterByName(planets);
  }

  function filterDelete() {
    const { filterByNumericValues } = filters;
    return filterByNumericValues.map(({ column, comparison, value }) => {
      if (column === '') return null;
      return (
        <div key={ column } data-testid="filter">
          <p>{column}</p>
          <p>{comparison}</p>
          <p>{value}</p>
          <button type="button" onClick={ () => removeFilter(column) }>X</button>
        </div>
      );
    });
  }

  function handleName(value) {
    const filterValueName = planets
      .filter(({ name }) => name.toLowerCase().includes(value.toLowerCase()));
    setFilterByName(filterValueName);
  }

  return (
    <ContextCreat.Provider
      value={ {
        filters,
        handleName,
        filterDelete,
        removeFilter,
        columnsFilter,
        sortFunction,
      } }
    >
      { children }
    </ContextCreat.Provider>
  );
}
ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
