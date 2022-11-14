import React from "react";
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import logoPath from "../../images/header-logo.svg";

function Login ({ onEnterUser, isInputDisabled }) {

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({mode:"onChange"});

  // const [email, setEmail] = React.useState("");
  // const [password, setPassword] = React.useState("");
  // const [isDisabled, setIsDisabled] = React.useState(false);


  // function handleChangeEmail(e) {
  //   e.preventDefault();
  //   setEmail(e.target.value);
  // }

  // function handleChangePassword(e) {
  //   e.preventDefault();
  //   setPassword(e.target.value);
  // }

  // function handleSignIn(e) {
  //   e.preventDefault();
  //   onEnterUser({
  //     email,
  //     password,
  //   });
  //   // setIsDisabled(false);
  // }

  const onSubmit = (data) => {
    onEnterUser({ email: data.email, password: data.password });
    reset();
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
        <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="login__fieldset">

            <label className="login__label" htmlFor="email">
              E-mail
            </label>
            <input
              className="login__input login__input-email"
              {...register('email', {
                pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i ,
                    message: "Поле Email заполнено некорректно"
                },
                required: "Поле Email должно быть заполнено"
            })}
              id="email"
              type="email"
              disabled={isInputDisabled}
            />
            <span className={`login__error-info${errors.email ? " login__error-info_active" : ""}`}>{errors.email ? errors.email.message : ""}</span>

            <label className="login__label" htmlFor="password">
              Пароль
            </label>
            <input
              className="login__input register__input-password"
              {...register("password", {
                minLength: {
                    value: 2,
                    message: "Пароль должен содержать не менее 2 знаков"},
                maxLength: {
                    value: 30,
                    message: "Пароль должен содержать не более 30 знаков"
                },
                required: "Поле Пароль должно быть заполнено"
            })}
              id="password"
              type="password"
              disabled={isInputDisabled}
            />
            <span className={`login__error-info${errors.password ? " login__error-info_active" : ""}`}>{errors.password ? errors.password.message : ""}</span>

            <button
              className={`login__button${!isValid ? " login__button_disabled" : ""}`}
              type="submit"
              disabled={!isValid}
            >
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
