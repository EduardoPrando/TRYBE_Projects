import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { deleteExpense as deleteExpenseAction } from '../actions';

class TableComponent extends Component {
  handleDelete(deletedId) {
    const { expenses, deleteExpense } = this.props;
    const expenseFilter = expenses.filter(({ id }) => id !== deletedId);
    deleteExpense(expenseFilter);
  }

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
        { expenses
          .map(({ id, description, tag, method, value, currency, exchangeRates }) => (
            <tr key={ id }>
              <td>{ description }</td>
              <td>{ tag }</td>
              <td>{ method }</td>
              <td>{ value }</td>
              <td>{ exchangeRates[currency].name.split('/')[0] }</td>
              <td>{ (parseFloat(exchangeRates[currency].ask)).toFixed(2) }</td>
              <td>
                { parseFloat(value) * parseFloat(exchangeRates[currency].ask) }
              </td>
              <td>Real</td>
              <td>
                <button type="button">Editar</button>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => this.handleDelete(id) }
                >
                  X
                </button>
              </td>
            </tr>
          ))}
      </table>
    );
  }
}

TableComponent.propTypes = ({
  expenses: PropTypes.objectOf(PropTypes.any),
}.isRequired);

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (expanse) => dispatch(deleteExpenseAction(expanse)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableComponent);
