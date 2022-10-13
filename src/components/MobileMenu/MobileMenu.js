import React from "react";
import profilePath from "../../images/profile.svg";
import { Link, Route } from "react-router-dom";

function MobileMenu({ isMobileMenuOpened, setIsMobileMenuOpened }) {

  function onCloseMenu () {
    setIsMobileMenuOpened(false);
  }

  return (
    <div className={`mobileMenu${isMobileMenuOpened ? " mobileMenu_active" : ""}`}>
      <div className="mobileMenu__menu">
        <button className="mobileMenu__close-button" onClick={onCloseMenu}/>

        <Route path="/movies">
          <div className="mobileMenu__link-block">
            <Link to="/" className="mobileMenu__link">
              Главная
            </Link>
            <Link
              to="movies"
              className="mobileMenu__link mobileMenu__active-link"
            >
              Фильмы
            </Link>
            <Link to="saved-movies" className="mobileMenu__link">
              Сохраненные фильмы
            </Link>
            <Link to="profile" className="mobileMenu__profile-link-block">
              <p className="mobileMenu__profile-link">Аккаунт</p>
              <img
                className="mobileMenu__profile-image"
                src={profilePath}
                alt="Вход в профиль аккаунта"
              />
            </Link>
          </div>
        </Route>

        <Route path="/saved-movies">
          <div className="navigation__link-block">
            <Link to="movies" className="navigation__link">
              Фильмы
            </Link>
            <Link
              to="saved-movies"
              className="navigation__link navigation__active-link"
            >
              Сохраненные фильмы
            </Link>
            <Link to="profile" className="navigation__profile-link-block">
              <p className="navigation__profile-link">Аккаунт</p>
              <img
                className="navigation__profile-image"
                src={profilePath}
                alt="Вход в профиль аккаунта"
              />
            </Link>
          </div>
          <div className="navigation__burger-menu">
            <button className="navigation__burger-menu-button"></button>
          </div>
        </Route>

        <Route path="/profile">
          <div className="navigation__link-block">
            <Link to="movies" className="navigation__link">
              Фильмы
            </Link>
            <Link to="saved-movies" className="navigation__link">
              Сохраненные фильмы
            </Link>
            <Link to="profile" className="navigation__profile-link-block">
              <p className="navigation__profile-link navigation__active-link">
                Аккаунт
              </p>
              <img
                className="navigation__profile-image"
                src={profilePath}
                alt="Вход в профиль аккаунта"
              />
            </Link>
          </div>
          <div className="navigation__burger-menu">
            <button className="navigation__burger-menu-button"></button>
          </div>
        </Route>

        <Route exact path="/">
          <div className="navigation__link-block">
            <Link
              to="/signup"
              className="navigation__link navigation__link_start-page"
            >
              Регистрация
            </Link>
            <Link to="/signin" className="navigation__button-link">
              <button className="navigation__button">Войти</button>
            </Link>
          </div>
          <div className="navigation__burger-menu">
            <button className="navigation__burger-menu-button"></button>
          </div>
        </Route>
      </div>
    </div>
  );
}

export default MobileMenu;
