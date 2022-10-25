import React from "react";
import Preloader from '../Preloader/Preloader';

function MoviesNotFound({ isLoading, searchStringIsMissed }) {
  if (isLoading) {
    return (
      <Preloader />
    );
  } else {
    return (
      <div className="movies-not-found__container">
        <p className="movies-not-found__text">{searchStringIsMissed ? "Нужно ввести ключевое слово" : "Ничего не найдено"}</p>
      </div>
    );
  }
}

export default MoviesNotFound;
