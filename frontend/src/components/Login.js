import React, { useState } from 'react';

const Login = ({ onLogin }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(email, password);
  }
  return (
    <div className="login">
      <h2 className="login__welcome">Вход</h2>
      <form onSubmit={handleSubmit} className="login__form">
        <input
          className='login__input'
          required
          id="email"
          name="email"
          type="text"
          onChange={handleEmail}
          value={email}
          placeholder="Email"
        />
        <input
          className='login__input'
          required
          id="password"
          name="password"
          type="password"
          onChange={handlePassword}
          value={password}
          placeholder="Пароль"
        />
        <div className="login__button-container">
          <button type="submit" className="login__button button">Войти</button>
        </div>
      </form>
    </div>
  );
}

export default Login;