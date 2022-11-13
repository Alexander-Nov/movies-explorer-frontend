import React from "react";
import { CurrentUserContext } from "../../contexts/currentUserContext";
import Header from "../Header/Header.js";

function Profile({ loggedIn, isMobileMenuOpened, setIsMobileMenuOpened, onUpdateUser, onSignOut }) {
  const [isDisabled, setIsDisabled] = React.useState(true); // true = инпуты заблокированы
  const [isReductionMode, setIsReductionMode] = React.useState(false); // true = две кнопки: Сохранить и выйти
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");


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

  function handleSignOut(e) {
    e.preventDefault();
    onSignOut();
  }

  function handleSaveProfileData(e) {
    e.preventDefault();
     onUpdateUser({
      name,
      email
    });
    setIsReductionMode(false);
    setIsDisabled(true);

    // тут будет логика сохранения данных
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  return (
    <section className="profile">
      <Header
        loggedIn={loggedIn}
        isMobileMenuOpened={isMobileMenuOpened}
        setIsMobileMenuOpened={setIsMobileMenuOpened}
      />
      <form className="profile__form">
        <h1 className="profile__title">{`Привет, ${name}!`}</h1>
        <fieldset className="profile__fieldset">
          <div className="profile__input-line">
            <label className="profile__label" htmlFor="name">
              Имя
            </label>
            <input
              className="profile__input profile__input-name"
              id="name"
              name="name"
              type="text"
              value={name || ""}
              onChange={handleChangeName}
              required
              minLength="2"
              disabled={isDisabled}
            />
          </div>

          <div className="profile__input-line">
            <label className="profile__label" htmlFor="email">
              E-mail
            </label>
            <input
              className="profile__input profile__input-email"
              id="email"
              name="email"
              type="text"
              value={email || ""}
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
                <button className="profile__exit-button" onClick={handleSignOut}>
                  Выйти из аккаунта
                </button>
              </div>
            ) : (
              <button
                className={`profile__save-button${
                  isDisabled ? " profile__save-button_disabled" : ""
                }`}
                disabled={isDisabled}
                onClick={handleSaveProfileData}
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
