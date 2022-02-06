import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleValue = this.handleValue.bind(this);
  }

  handleValue(expenses) {
    const totalValue = expenses
      .reduce(
        (accumulator,
          { value,
            currency,
            exchangeRates,
          }) => accumulator + value * parseFloat(exchangeRates[currency].ask), 0,
      );
    return totalValue;
  }

  render() {
    const { email, expenses } = this.props;
    return (
      <header>
        <div data-testid="email-field">
          { email }
        </div>
        <div data-testid="total-field">
          <p>{ expenses.length > 0 ? this.handleValue(expenses) : 0 }</p>
        </div>
        <div data-testid="header-currency-field">
          BRL
        </div>
      </header>
    );
  }
}

Header.propTypes = ({
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any),
});

Header.defaultProps = {
  expenses: [],
};

const mapStateToProps = (store) => ({
  expenses: store.wallet.expenses,
  email: store.user.email,
});

export default connect(mapStateToProps)(Header);
