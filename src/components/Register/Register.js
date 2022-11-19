import React from "react";
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import logoPath from "../../images/header-logo.svg";

function Register({ onAddUser, isInputDisabled }) {

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({mode:"onChange"});

  const onSubmit = (data) => {
    onAddUser({ name: data.name, email: data.email, password: data.password });
  };

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
        <form className="register__form" onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="register__fieldset">
            <label className="register__label" htmlFor="name">
              Имя
            </label>
            <input
              className="register__input register__input-name"
              {...register("name", {
                minLength: {
                  value: 2,
                  message: "Имя должно содержать не менее 2 знаков"},
                maxLength: {
                  value: 30,
                  message: "Имя должно содержать не более 30 знаков"
                },
                pattern: {
                  value: /^[A-Za-zА-Яа-я ]+$/,
                  message: "Поле Имя заполнено некорректно"
                },
                required: "Поле Имя должно быть заполнено"
            })}
              id="name"
              type="text"
              disabled={isInputDisabled}
            />
            <span className={`register__error-info${errors.name ? " register__error-info_active" : ""}`}>{errors.name ? errors.name.message : ""}</span>

            <label className="register__label" htmlFor="email">
              E-mail
            </label>
            <input
              className="register__input register__input-email"
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
            <span className={`register__error-info${errors.email ? " register__error-info_active" : ""}`}>{errors.email ? errors.email.message : ""}</span>

            <label className="register__label" htmlFor="password">
              Пароль
            </label>
            <input
              className="register__input register__input-password"
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
              name="password"
              type="password"
              disabled={isInputDisabled}
            />
            <span className={`register__error-info${errors.password ? " register__error-info_active" : ""}`}>{errors.password ? errors.password.message : ""}</span>

            <button
              className={`register__button${
                !isValid ? " register__button_disabled" : ""
              }`}
              type="submit"
              disabled={!isValid}
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
