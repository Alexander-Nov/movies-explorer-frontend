import React from "react";
import { Link } from "react-router-dom";
import logoPath from "../../images/header-logo.png";

function Register(props) {
  const [name, setName] = React.useState("Виталий");
  const [email, setEmail] = React.useState("pochta@yandex.ru|");
  const [password, setPassword] = React.useState("");
  const [isDisabled, setIsDisabled] = React.useState(false);

  function handleChangeName(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleChangeEmail(e) {
    e.preventDefault();
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    e.preventDefault();
    setPassword(e.target.value);
  }

  function handleSignUp(e) {
    e.preventDefault();
    // setIsDisabled(false);
  }

  return (
    <section className="register">
      <div className="register__content">
        <Link to="/" className="register__logo-link">
          <img
            className="register__logo"
            src={logoPath}
            alt="Логотип проекта Movies Explorer"
          />
        </Link>
        <h1 className="register__title">Добро пожаловать!</h1>
        <form className="register__form">
          <fieldset className="register__fieldset">
            <label className="register__label" for="name">
              Имя
            </label>
            <input
              className="register__input register__input-name"
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={handleChangeName}
              required
              minLength="2"
              disabled={isDisabled}
            />

            <label className="register__label" for="email">
              E-mail
            </label>
            <input
              className="register__input register__input-email"
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={handleChangeEmail}
              required
              minLength="2"
              disabled={isDisabled}
            />

            <label className="register__label" for="password">
              Пароль
            </label>
            <input
              className="register__input register__input-password"
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={handleChangePassword}
              required
              minLength="2"
              disabled={isDisabled}
            />

            <button
              className={`register__button${
                isDisabled ? " register__button_disabled" : ""
              }`}
              onClick={handleSignUp}
              disabled={isDisabled}
            >
              Зарегистрироваться
            </button>

            <div className="register__sign-in-area">
              <p className="register__sign-in-text">Уже зарегистрированы?</p>
              <Link to="signin" className="register__sign-in-link">
                Войти
              </Link>
            </div>
          </fieldset>
        </form>
      </div>
    </section>
  );
}

export default Register;
