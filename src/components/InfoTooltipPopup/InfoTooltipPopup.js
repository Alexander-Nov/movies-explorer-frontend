import React from "react";
import successImage from '../../images/success.png';
import failImage from '../../images/fail.png';

function InfoTooltipPopup({ isPopupOpen, messageText, isResultSuccess, onClose}) {
  const popupMessageText = messageText;

  return (
    <div className={`popup ${isPopupOpen ? " popup_is-opened" : ""}`}>
      <div className="popup__form">
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
        ></button>
        <img
          className="popup__success-image"
          src={isResultSuccess ? successImage : failImage}
          alt={isResultSuccess ? "Успешно" : "Ошибка"}
        />
        <h2 className="popup__title popup__title_centered">{popupMessageText}</h2>
      </div>
    </div>
  )
}

export default InfoTooltipPopup;
