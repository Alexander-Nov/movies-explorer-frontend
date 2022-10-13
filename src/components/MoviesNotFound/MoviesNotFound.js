import React from "react";
import Preloader from '../Preloader/Preloader';

function MoviesNotFound({ isLoading }) {
  if (isLoading) {
    return (
      <Preloader />
    );
  } else {
    return (
      <div className="movies-not-found__container">
        <p className="movies-not-found__text">Ничего не найдено</p>
      </div>
    );
  }
}

export default MoviesNotFound;
