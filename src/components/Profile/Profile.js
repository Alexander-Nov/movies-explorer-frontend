import React from "react";

function Profile(props) {
  const [name, setName] = React.useState("Виталий");
  const [email, setEmail] = React.useState("pochta@yandex.ru");
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [isReductionMode, setIsReductionMode] = React.useState(true);

  function handleChangeName(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleChangeEmail(e) {
    e.preventDefault();
    setEmail(e.target.value);
  }

  function handleEnableReduction(e) {
    e.preventDefault();
    setIsDisabled(false);
    setIsReductionMode(true);
  }

  function handleExit(e) {
    e.preventDefault();
    // тут будет логика выхода из аккаунта
  }

  return (
    <section className="profile">
      <form className="profile__form">
        <h1 className="profile__title">Привет, Виталий!</h1>
        <fieldset className="profile__fieldset">
          <div className="profile__input-line">
            <label className="profile__label" for="name">
              Имя
            </label>
            <input
              className="profile__input profile__input-name"
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={handleChangeName}
              required
              minLength="2"
              disabled={isDisabled}
            />
          </div>

          <div className="profile__input-line">
            <label className="profile__label" for="email">
              E-mail
            </label>
            <input
              className="profile__input profile__input-email"
              id="email"
              name="email"
              type="text"
              value={email}
              onChange={handleChangeEmail}
              required
              minLength="2"
              disabled={isDisabled}
            />
          </div>

          <section className="profile__button-area">
            {!isReductionMode ? (
              <div className="profile__default-buttons">
                <button
                  className="profile__text-button"
                  onClick={handleEnableReduction}
                >
                  Редактировать
                </button>
                <button className="profile__exit-button" onClick={handleExit}>
                  Выйти из аккаунта
                </button>
              </div>
            ) : (
              <button
              className={`profile__save-button${isDisabled ? " profile__save-button_disabled" : ""}`}
              disabled={isDisabled}
              >Сохранить</button>
            )}
          </section>
        </fieldset>
      </form>
    </section>
  );
}

export default Profile;
