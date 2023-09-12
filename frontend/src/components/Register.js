import React from "react";
import { Link } from 'react-router-dom';

const Register = ({ onRegister }) => {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(email, password);
  }

  return (
    <div className="register">
      <h2 className="register__welcome">Регистрация</h2>
      <form onSubmit={handleSubmit} className="register__form">
        <input
          className='register__input'
          id="email"
          name="email"
          type="email"
          onChange={handleEmail}
          value={email}
          placeholder="Email"
        />
        <input
          className='register__input'
          id="password"
          name="password"
          type="password"
          onChange={handlePassword}
          value={password}
          placeholder="Пароль"
        />
        <div className="register__button-container">
          <button type="submit" onSubmit={handleSubmit} className="register__button button">Зарегистрироваться</button>
        </div>
      </form>
      <div className="register__signin">
        <p>Уже зарегистрированы? <Link to="/sign-in" className="register__login-link button">Войти</Link></p>
      </div>
    </div>
  );
}

export default Register;
