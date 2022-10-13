import React from "react";
import { Link } from "react-router-dom";
import logoPath from "../../images/header-logo.svg";

function Login (props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isDisabled, setIsDisabled] = React.useState(false);


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
    <section className="login">
      <div className="login__content">
      <Link to="/" className="login__logo-link">
      <img
          className="login__logo"
          src={logoPath}
          alt="Логотип проекта Movies Explorer"
        />
        </Link>
        <h1 className="login__title">Рады видеть!</h1>
        <form className="login__form">
          <fieldset className="login__fieldset">

            <label className="login__label" for="email">
              E-mail
            </label>
            <input
              className="login__input login__input-email"
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={handleChangeEmail}
              required
              minLength="2"
              disabled={isDisabled}
            />

            <label className="login__label" for="password">
              Пароль
            </label>
            <input
              className="login__input register__input-password"
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={handleChangePassword}
              required
              minLength="2"
              disabled={isDisabled}
            />

            <button className={`login__button${isDisabled ? " login__button_disabled" : ""}`} onClick={handleSignUp} disabled={isDisabled}>
              Войти
            </button>

            <div className="login__sign-in-area">
              <p className="login__sign-in-text">Ещё не зарегистрированы?</p>
              <Link to="signup" className="login__sign-up-link">
                Регистрация
              </Link>
            </div>
          </fieldset>
        </form>
      </div>
    </section>
  );
}

export default Login;
