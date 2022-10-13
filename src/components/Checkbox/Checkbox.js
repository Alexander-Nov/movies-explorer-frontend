import React from "react";
import checkboxOnStatusImage from "../../images/checkbox-on.svg";
import checkboxOffStatusImage from "../../images/checkbox-off.svg";

function Checkbox({ isChecked, onCheckboxClick }) {
  return (
    <div className="checkbox-group">
      <button className="checkbox-group__button" onClick={onCheckboxClick}>
        <img
          className="checkbox-group__image"
          src={`${isChecked ? checkboxOnStatusImage : checkboxOffStatusImage}`}
          alt="Чекбокс выбора короткометражных фильмов"
        />
      </button>
      <p className="checkbox-group__title">Короткометражки</p>
    </div>
  );
}

export default Checkbox;
