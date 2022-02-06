import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userInformation as userInformationAction } from '../actions';
import InputComponent from '../components/InputComponent';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      userValidation: false,
      passwordValidation: false,
    };

    this.checkEmail = this.checkEmail.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
  }

  checkEmail({ target }) {
    const { value } = target;
    // Regex fonte https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    const emailRegex = /\S+@\S+\.\S+/;
    const userValidation = emailRegex.test(value);

    this.setState({
      email: value,
      userValidation,
    });

    this.handleClick = this.handleClick.bind(this);
  }

  checkPassword({ target }) {
    const { value } = target;
    const minPassword = 6;
    this.setState({
      password: value,
      passwordValidation: value.length >= minPassword,
    });
  }

  handleClick() {
    const { history, userInformation } = this.props;
    const { email } = this.state;

    userInformation(email);
    history.push('/carteira');
  }

  render() {
    const { email, password, userValidation, passwordValidation } = this.state;
    return (
      <>
        <div>Login</div>
        <InputComponent
          label="Email"
          type="email"
          name="email"
          datatestid="email-input"
          value={ email }
          onChange={ this.checkEmail }
        />
        <InputComponent
          label="Password"
          type="password"
          name="password"
          datatestid="password-input"
          value={ password }
          onChange={ this.checkPassword }
        />
        <button
          type="button"
          disabled={ !(userValidation && passwordValidation) }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </>
    );
  }
}

Login.propTypes = ({
  history: PropTypes.objectOf(PropTypes.any),
  userInformation: PropTypes.func,
}.isRequired);

const mapDispatchToProps = (dispatch) => ({
  userInformation: (email) => dispatch(userInformationAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);
