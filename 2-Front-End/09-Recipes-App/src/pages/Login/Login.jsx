import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const INITIAL_LOGIN_STATE = {
  login: '',
  password: '',
  isEmailValid: false,
  isPassValid: false,
};

const MIN_CHAR = 6;

export default function Login() {
  const [login, setLogin] = useState(INITIAL_LOGIN_STATE);
  const history = useHistory();

  const saveEmail = ({ target }) => {
    const validation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (validation.test(target.value)) {
      setLogin({ ...login, login: target.value, isEmailValid: true });
    } else {
      setLogin({ ...login, isEmailValid: false });
    }
  };

  const savePass = ({ target }) => {
    if (target.value.length > MIN_CHAR) {
      setLogin({ ...login, password: target.value, isPassValid: true });
    } else {
      setLogin({ ...login, isPassValid: false });
    }
  };

  const submitLogin = (e) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify({ email: login.login }));
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    history.push('/comidas');
  };

  return (
    <div>
      <h2 id="text">Login</h2>
      <label htmlFor="login">
        Email:
        <input
          type="email"
          data-testid="email-input"
          id="login"
          onChange={ saveEmail }
        />
      </label>
      <label htmlFor="password">
        Senha:
        <input
          type="password"
          data-testid="password-input"
          id="password"
          onChange={ savePass }
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
        onClick={ submitLogin }
        disabled={ !(login.isEmailValid && login.isPassValid) }
      >
        Entrar
      </button>
    </div>
  );
}
