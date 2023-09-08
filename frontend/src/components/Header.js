import headerLogo from '../images/logo.svg'
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';


function Header({ onSignOut, userEmail }) {
  return (
    <header className="header">
      <img className="logo" src={headerLogo} alt="Логотип сайта Место" />
      <Routes>
        <Route path='/' element={
          <div className='header__menu'>
            <a className='header__email'>{userEmail}</a>
            <Link className='header__exit button' to='/signin' onClick={onSignOut}>Выйти</Link>
          </div>
        }
        />

        <Route path='/signin' element={
          <Link className='header__signup button' to='/signup'>Регистрация</Link>
        }
        />

        <Route path='/signup' element={
          <Link className='header__signin button' to='/signin'>Войти</Link>
        }
        />

      </Routes>
    </header>
  )
}

export default Header;