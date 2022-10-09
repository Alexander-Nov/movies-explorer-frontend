import React from "react";
import logoPath from "../../images/header-logo.png";
import profilePath from "../../images/profile.png"
import { Link, Route } from "react-router-dom";

function Header({ loggedIn }) {
  // function handleMenuOpen() {
  //   props.onMenuOpen();
  // }

  return (
    <header className={`header ${loggedIn ? "" : "header_dark-background"}`}>
      <img
        className="header__logo"
        src={logoPath}
        alt="Логотип проекта Movies Explorer"
      />

      <Route path="/movies">
        <div className="header__link-block">
          <Link to="movies" className="header__link header__active-link">
            Фильмы
          </Link>
          <Link to="saved-movies" className="header__link">
            Сохраненные фильмы
          </Link>
          <Link to="profile" className="header__profile-link-block">
            <p className="header__profile-link">Аккаунт</p>
            <img className="header__profile-image" src={profilePath} alt="Вход в профиль аккаунта" />
          </Link>
        </div>
      </Route>
      <Route exact path="/">
        <div className="header__link-block">
          <a href="/" className="header__link header__link_start-page">
            Регистрация
          </a>
          <button className="header__button">Войти</button>

          {/* <Link to='signup' className="header__link">Регистрация</Link>
        <Link to='signin' className="header__link">Войти</Link> */}
        </div>
      </Route>
    </header>
  );
}

export default Header;
