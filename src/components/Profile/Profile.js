import React from "react";
import { CurrentUserContext } from "../../contexts/currentUserContext";
import Header from "../Header/Header.js";
import { useForm } from 'react-hook-form';

function Profile({ loggedIn, isMobileMenuOpened, setIsMobileMenuOpened, onUpdateUser, onSignOut, setInfoTooltipMessage, setIsPopupOpen, setIsResultSuccess }) {

  const [isReductionMode, setIsReductionMode] = React.useState(false); // если true = две кнопки: Сохранить и выйти
  const [isDisabled, setIsDisabled] = React.useState(true); // если true = инпуты заблокированы
  const currentUser = React.useContext(CurrentUserContext);

  const {
    register,
    formState: { errors, isValid, isDirty,},
    handleSubmit,
  } = useForm({mode:"onChange", defaultValues: { name: currentUser.name, email: currentUser.email}});

  function handleEnableReduction(e) {
    e.preventDefault();
    setIsDisabled(false);
    setIsReductionMode(true);
  }

  function handleSignOut(e) {
    e.preventDefault();
    onSignOut();
  }

  const onSubmit = (data) => {
    if ((data.name !== currentUser.name) || (data.email !== currentUser.email)) {
      onUpdateUser({ name: data.name, email: data.email });
      setIsReductionMode(false);
      setIsDisabled(true);
      setIsResultSuccess(true);
      setInfoTooltipMessage("Новые данные успешно сохранены");
      setIsPopupOpen(true);
    } else {
      setInfoTooltipMessage("Изменение данных не обнаружено");
      setIsPopupOpen(true);
    }
}

  return (
    <section className="profile">
      <Header
        loggedIn={loggedIn}
        isMobileMenuOpened={isMobileMenuOpened}
        setIsMobileMenuOpened={setIsMobileMenuOpened}
      />
      <form className="profile__form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
        <fieldset className="profile__fieldset">
          <div className="profile__input-line">
            <label className="profile__label" htmlFor="name">
              Имя
            </label>
            <input
              className="profile__input profile__input-name"
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
              disabled={isDisabled}
            />
          </div>
          <span className={`profile__error-info${errors.name ? " profile__error-info_active" : ""}`}>{errors.name ? errors.name.message : ""}</span>

          <div className="profile__input-line">
            <label className="profile__label" htmlFor="email">
              E-mail
            </label>
            <input
              className="profile__input profile__input-email"
              {...register('email', {
                pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i ,
                    message: "Поле Email заполнено некорректно"
                },
                required: "Поле Email должно быть заполнено"
              })}
              id="email"
              type="email"
              disabled={isDisabled}
            />
          </div>
          <span className={`profile__error-info${errors.email ? " profile__error-info_active" : ""}`}>{errors.email ? errors.email.message : ""}</span>

          <section className="profile__button-area">
            {!isReductionMode ? (
              <div className="profile__default-buttons">
                <button
                  className="profile__text-button"
                  onClick={handleEnableReduction}
                >
                  Редактировать
                </button>
                <button className="profile__exit-button" onClick={handleSignOut}>
                  Выйти из аккаунта
                </button>
              </div>
            ) : (
              <button
                className={`profile__save-button${
                  (!isValid || !isDirty) ? " profile__save-button_disabled" : ""
                }`}
                type="submit"
                disabled={!isValid || !isDirty}
              >
                Сохранить
              </button>
            )}
          </section>
        </fieldset>
      </form>
    </section>
  );
}

export default Profile;
