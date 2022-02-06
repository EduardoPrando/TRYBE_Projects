import React, { useContext } from 'react';
import ContextCreat from '../../context/ContextCreat';
import './Index.css';

export default function Table() {
  const { filters } = useContext(ContextCreat);
  function filterName() {
    return filters.filterByName.name
      .map((nameFilter) => (
        <tr key={ nameFilter.name }>
          <td data-testid="planet-name">{nameFilter.name}</td>
          <td>{nameFilter.created}</td>
          <td>{nameFilter.edited}</td>
          <td>{nameFilter.films[0]}</td>
          <td>{nameFilter.rotation_period}</td>
          <td>{nameFilter.orbital_period}</td>
          <td>{nameFilter.diameter}</td>
          <td>{nameFilter.climate}</td>
          <td>{nameFilter.gravity}</td>
          <td>{nameFilter.terrain}</td>
          <td>{nameFilter.surface_water}</td>
          <td>{nameFilter.population}</td>
          <td>{nameFilter.url}</td>
        </tr>
      ));
  }

  const headerTable = [
    'name',
    'created',
    'edited',
    'films',
    'rotation_period',
    'orbitalPeriod',
    'diameter',
    'climate',
    'gravity',
    'terrain',
    'surfaceWater',
    'population',
    'url',
  ];

  return (
    <table>
      <thead>
        <tr>
          { headerTable.map((head) => (
            <th key={ head }>{head}</th>
          )) }
        </tr>
      </thead>
      <tbody>
        { filterName() }
      </tbody>
    </table>
  );
}
