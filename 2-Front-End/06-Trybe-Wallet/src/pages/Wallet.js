import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import {
  coinsFetchThunk as coinsFetchThunkAction,
  exchangeFetchThunk as exchangeFetchThunkAction,
} from '../actions/index';

import Header from '../components/Header';
import SelectOptionComponent from '../components/SelectOptionComponent';
// import InputPages from '../components/InputPages';
import InputComponent from '../components/InputComponent';
import TableComponent from '../components/TableComponent';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      exchangeRates: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleInputsForm = this.handleInputsForm.bind(this);
    this.handleCurrencies = this.handleCurrencies.bind(this);
  }

  componentDidMount() {
    const { coinsFetchThunk } = this.props;
    coinsFetchThunk();
  }

  handleInputsForm(label, type, name, value) {
    return (<InputComponent
      label={ label }
      type={ type }
      name={ name }
      value={ value }
      onChange={ this.handleChange }
    />);
  }

  handleClick() {
    const { exchangeFetchThunk } = this.props;
    const { id } = this.state;
    this.setState({
      id,
    });
    exchangeFetchThunk(this.state);
    this.setState({
      id: id + 1,
    });
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  handleCurrencies() {
    const { currencies } = this.props;
    const currencyLength = 3;
    const payload = Object.keys(currencies)
      .filter((currency) => currency.length === currencyLength);
    return payload;
  }

  // { this.handleInputsForm('Valor', 'text', 'valor', value) }

  render() {
    const paymentMethod = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tagSelect = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const { value, description, currency, method, tag } = this.state;
    return (
      <>
        <Header />
        <form action="">
          {/* <InputPages /> */}
          { this.handleInputsForm('Valor', 'text', 'value', value) }
          { this.handleInputsForm('Descrição', 'text', 'description', description) }
          <SelectOptionComponent
            textCoin="Moeda"
            name="currency"
            value={ currency }
            mapValue={ this.handleCurrencies() }
            onChange={ this.handleChange }
          />
          <SelectOptionComponent
            textCoin="Método de pagamento"
            name="method"
            value={ method }
            mapValue={ paymentMethod }
            onChange={ this.handleChange }
          />
          <SelectOptionComponent
            textCoin="Tag"
            name="tag"
            value={ tag }
            mapValue={ tagSelect }
            onChange={ this.handleChange }
          />
          <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>
          <TableComponent />
        </form>
      </>
    );
  }
}

Wallet.propTypes = ({
  email: PropTypes.string,
}.isRequired);

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  coinsFetchThunk: () => dispatch(coinsFetchThunkAction()),
  exchangeFetchThunk: (expenses) => dispatch(exchangeFetchThunkAction(expenses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
